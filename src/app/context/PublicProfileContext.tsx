import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { contactContent, contactData } from "../../data/contact";
import { siteProfile } from "../../data/profile";
import { getProfile, type Profile } from "../../services/profile";

export type PublicProfile = {
  name: string;
  description: string;
  history: string;
  vision: string;
  mission: string;
  address: string;
  mapsUrl: string | null;
  youtubeUrl: string | null;
  instagramUrl: string | null;
  email: string;
  phone: string;
  logoUrl: string | null;
};

const localProfile: PublicProfile = {
  name: siteProfile.name,
  description: siteProfile.about.description,
  history: siteProfile.about.paragraphs[0],
  vision: siteProfile.about.paragraphs[1],
  mission: "",
  address: contactData[0].value,
  mapsUrl: contactContent.mapUrl,
  youtubeUrl: null,
  instagramUrl: null,
  email: contactData[2].value,
  phone: contactData[1].value,
  logoUrl: null,
};

function text(value: string | null, fallback: string) {
  return value?.trim() || fallback;
}

function safeUrl(value: string | null, fallback: string | null) {
  const candidate = value?.trim() || fallback;
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

function resolveProfile(profile: Profile): PublicProfile {
  return {
    name: text(profile.nama_padukuhan, localProfile.name),
    description: text(profile.deskripsi, localProfile.description),
    history: text(profile.sejarah, localProfile.history),
    vision: text(profile.visi, localProfile.vision),
    mission: text(profile.misi, localProfile.mission),
    address: text(profile.alamat, localProfile.address),
    mapsUrl: safeUrl(profile.maps_url, localProfile.mapsUrl),
    youtubeUrl: safeUrl(profile.youtube_url, localProfile.youtubeUrl),
    instagramUrl: safeUrl(profile.instagram_url, localProfile.instagramUrl),
    email: text(profile.email, localProfile.email),
    phone: text(profile.telepon, localProfile.phone),
    logoUrl: safeUrl(profile.logo_url, localProfile.logoUrl),
  };
}

const PublicProfileContext = createContext<PublicProfile>(localProfile);

export function PublicProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(localProfile);

  useEffect(() => {
    let active = true;
    getProfile()
      .then((record) => {
        if (active) setProfile(resolveProfile(record));
      })
      .catch(() => {
        // Retain every existing local field when the single public read fails.
      });
    return () => {
      active = false;
    };
  }, []);

  return <PublicProfileContext.Provider value={profile}>{children}</PublicProfileContext.Provider>;
}

export function usePublicProfile() {
  return useContext(PublicProfileContext);
}
