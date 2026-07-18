import type { ReferenceDetailData } from "@/types/reference";

function img(seed: string, width: number, height: number) {
  return {
    url: `https://picsum.photos/seed/${seed}/${width}/${height}`,
    width,
    height,
  };
}

export const mockReferences: ReferenceDetailData[] = [
  {
    id: "1",
    slug: "norm-architects",
    title: "Norm Architects",
    subtitle: "Studio",
    mainImage: img("norm-1", 800, 1000),
    type: { name: "Studio", slug: "studio" },
    areas: [
      { name: "Branding", slug: "branding" },
      { name: "Identity", slug: "identity" },
    ],
    tags: [
      { name: "Minimal", slug: "minimal" },
      { name: "Scandinavian", slug: "scandinavian" },
      { name: "Editorial Assets", slug: "editorial-assets" },
      { name: "Natural Materials", slug: "natural-materials" },
    ],
    description:
      "Original specimen and promotional material for a refined and neutral studio identity system.",
    gallery: [
      img("norm-1", 800, 1000),
      img("norm-2", 800, 900),
      img("norm-3", 800, 1100),
      img("norm-4", 800, 950),
    ],
    links: [{ label: "Official Website", url: "https://example.com" }],
    metadata: [
      { label: "Founded", value: "2008" },
      { label: "Country", value: "Denmark" },
      { label: "Specialty", value: "Interior Design" },
    ],
    createdAt: "2026-01-07",
  },
  {
    id: "2",
    slug: "actually-i-can",
    title: "Actually, I Can",
    subtitle: "Hope Core",
    mainImage: img("hope-1", 800, 650),
    type: { name: "Visual Asset", slug: "visual-asset" },
    areas: [{ name: "Photography", slug: "photography" }],
    tags: [
      { name: "Gradient", slug: "gradient" },
      { name: "Texture", slug: "texture" },
    ],
    description: "Typography over landscape photography, exploring hope-core visual language.",
    gallery: [img("hope-1", 800, 650), img("hope-2", 800, 650)],
    links: [],
    metadata: [],
    createdAt: "2026-02-14",
  },
  {
    id: "3",
    slug: "mac-demarco",
    title: "Mac DeMarco",
    subtitle: "Singer & Songwriter",
    mainImage: img("mac-1", 800, 1050),
    type: { name: "Designer", slug: "designer" },
    areas: [{ name: "Branding", slug: "branding" }],
    tags: [
      { name: "Indie Genre", slug: "indie-genre" },
      { name: "Bedroom Pop", slug: "bedroom-pop" },
      { name: "Alternative Style", slug: "alternative-style" },
      { name: "Folk Influences", slug: "folk-influences" },
    ],
    description: "Album artwork and identity system exploring lo-fi, DIY aesthetics.",
    gallery: [img("mac-1", 800, 1050), img("mac-2", 800, 980)],
    links: [{ label: "Discography", url: "https://example.com" }],
    metadata: [
      { label: "Occupation", value: "Musician" },
      { label: "Country", value: "Canada" },
    ],
    createdAt: "2026-03-02",
  },
  {
    id: "4",
    slug: "sufjan-stevens",
    title: "Sufjan Stevens",
    subtitle: "Singer & Songwriter",
    mainImage: img("sufjan-1", 800, 750),
    type: { name: "Designer", slug: "designer" },
    areas: [{ name: "Editorial", slug: "editorial" }],
    tags: [
      { name: "Folk", slug: "folk" },
      { name: "Illinois", slug: "illinois" },
      { name: "LTGBQ+", slug: "lgbtq" },
    ],
    description: "Editorial layouts and cover art exploring orchestral folk visual identity.",
    gallery: [img("sufjan-1", 800, 750)],
    links: [],
    metadata: [],
    createdAt: "2026-03-10",
  },
  {
    id: "5",
    slug: "ninajirachi",
    title: "Ninajirachi",
    subtitle: "Singer & DJ",
    mainImage: img("nina-1", 800, 1200),
    type: { name: "Designer", slug: "designer" },
    areas: [{ name: "UI", slug: "ui" }],
    tags: [
      { name: "Electronic Music", slug: "electronic-music" },
      { name: "Future of Pop", slug: "future-of-pop" },
      { name: "Computer Music", slug: "computer-music" },
    ],
    description: "Digital-native visual identity mixing UI motifs with pop iconography.",
    gallery: [img("nina-1", 800, 1200), img("nina-2", 800, 1150)],
    links: [{ label: "Instagram", url: "https://example.com" }],
    metadata: [],
    createdAt: "2026-04-01",
  },
];