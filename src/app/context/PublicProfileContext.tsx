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
  heroHeadline: string;
  heroSubheadline: string;
  heroImageUrl: string;
  aboutImageUrl: string;
  population: number | null;
  households: number | null;
  neighborhoodUnits: number | null;
  communityUnits: number | null;
  serviceHours: string;
  facebookUrl: string | null;
  websiteUrl: string | null;
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
  heroHeadline: `${siteProfile.hero.title} ${siteProfile.hero.highlightedTitle}`,
  heroSubheadline: siteProfile.hero.description,
  heroImageUrl: siteProfile.hero.image,
  aboutImageUrl: siteProfile.about.images[0].src,
  population: null,
  households: null,
  neighborhoodUnits: null,
  communityUnits: null,
  serviceHours: contactData[3].value,
  facebookUrl: null,
  websiteUrl: null,
};

function text(value: string | null, fallback: string) {
  return value?.trim() || fallback;
}

function optionalText(value: string | null) {
  const cleaned = value?.trim() ?? "";
  return /^(deskripsi singkat|judul|isi)$/i.test(cleaned) ? "" : cleaned;
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

function statistic(value: number | null) {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}

function resolveProfile(profile: Profile): PublicProfile {
  return {
    name: text(profile.nama_padukuhan, localProfile.name),
    description: optionalText(profile.deskripsi),
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
    heroHeadline: text(profile.hero_headline, localProfile.heroHeadline),
    heroSubheadline: text(profile.hero_subheadline, localProfile.heroSubheadline),
    heroImageUrl: safeUrl(profile.hero_image_url, localProfile.heroImageUrl) ?? localProfile.heroImageUrl,
    aboutImageUrl: safeUrl(profile.about_image_url, localProfile.aboutImageUrl) ?? localProfile.aboutImageUrl,
    population: statistic(profile.jumlah_jiwa),
    households: statistic(profile.jumlah_kk),
    neighborhoodUnits: statistic(profile.jumlah_rt),
    communityUnits: statistic(profile.jumlah_rw),
    serviceHours: text(profile.jam_pelayanan, localProfile.serviceHours),
    facebookUrl: safeUrl(profile.facebook_url, localProfile.facebookUrl),
    websiteUrl: safeUrl(profile.website_url, localProfile.websiteUrl),
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
