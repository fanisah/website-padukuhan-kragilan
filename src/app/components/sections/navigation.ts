export const NAV_LINKS = [
  { label: "Beranda",  href: "#beranda"  },
  { label: "Profil",   href: "#tentang"  },
  { label: "Potensi",  href: "#potensi"  },
  { label: "UMKM",     href: "#umkm"     },
  { label: "Berita",   href: "#berita"   },
  { label: "Agenda",   href: "#agenda"   },
  { label: "Galeri",   href: "#galeri"   },
  { label: "Kontak",   href: "#kontak"   },
];

export function goTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

// â”€â”€â”€ ORNAMENT DIVIDER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Inspired by the Javanese scroll ornaments from the reference images.
// Uses terracotta, warm yellow, and teal â€” matching the new site palette.
