import { prisma } from "../lib/prisma";

async function main() {
  console.log("🧹 Clearing database...");

  await prisma.reference.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.area.deleteMany();
  await prisma.type.deleteMany();

  console.log("🌱 Seeding Types...");

  await prisma.type.createMany({
    data: [
      { name: "Website", slug: "website" },
      { name: "Designer", slug: "designer" },
      { name: "Studio", slug: "studio" },
      { name: "Brand", slug: "brand" },
      { name: "Tool", slug: "tool" },
      { name: "Book", slug: "book" },
      { name: "Project", slug: "project" },
      { name: "Product", slug: "product" },
      { name: "Visual Asset", slug: "visual-asset" },
      { name: "Font", slug: "font" },
    ],
  });

  console.log("🌱 Seeding Areas...");

  await prisma.area.createMany({
    data: [
      { name: "UI", slug: "ui" },
      { name: "UX", slug: "ux" },
      { name: "Branding", slug: "branding" },
      { name: "Editorial", slug: "editorial" },
      { name: "Typography", slug: "typography" },
      { name: "Packaging", slug: "packaging" },
      { name: "Photography", slug: "photography" },
      { name: "Illustration", slug: "illustration" },
      { name: "Motion", slug: "motion" },
      { name: "3D", slug: "3d" },
      { name: "Industrial Design", slug: "industrial-design" },
      { name: "Product Design", slug: "product-design" },
      { name: "Creative Coding", slug: "creative-coding" },
      { name: "Architecture", slug: "architecture" },
      { name: "Art Direction", slug: "art-direction" },
    ],
  });

  console.log("🌱 Seeding Tags...");

  await prisma.tag.createMany({
    data: [
      { name: "Minimal", slug: "minimal" },
      { name: "Experimental", slug: "experimental" },
      { name: "Swiss", slug: "swiss" },
      { name: "Bauhaus", slug: "bauhaus" },
      { name: "Brutalist", slug: "brutalist" },
      { name: "Y2K", slug: "y2k" },
      { name: "Retro", slug: "retro" },
      { name: "Dark Mode", slug: "dark-mode" },
      { name: "Light Mode", slug: "light-mode" },
      { name: "Responsive", slug: "responsive" },
      { name: "Accessibility", slug: "accessibility" },
      { name: "Design System", slug: "design-system" },
      { name: "Grid", slug: "grid" },
      { name: "Asymmetry", slug: "asymmetry" },
      { name: "Gradient", slug: "gradient" },
      { name: "Texture", slug: "texture" },
      { name: "Glassmorphism", slug: "glassmorphism" },
      { name: "Generative", slug: "generative" },
      { name: "AI", slug: "ai" },
      { name: "Open Source", slug: "open-source" },
      { name: "Award Winning", slug: "award-winning" },
      { name: "Case Study", slug: "case-study" },
      { name: "Concept", slug: "concept" },
      { name: "Icons", slug: "icons" },
      { name: "Portfolio", slug: "portfolio" },
      { name: "Landing Page", slug: "landing-page" },
      { name: "Dashboard", slug: "dashboard" },
      { name: "E-commerce", slug: "ecommerce" },
      { name: "Mobile", slug: "mobile" },
      { name: "Desktop", slug: "desktop" },
    ],
  });

  console.log("🌱 Seeding Collections...");

  await prisma.collection.createMany({
    data: [
      {
        title: "Favorite Websites",
        slug: "favorite-websites",
        description: "Personal selection of inspiring websites.",
        coverImage: {
          url: "",
          publicId: "",
        },
      },
      {
        title: "Typography Collection",
        slug: "typography-collection",
        description: "References focused on typography.",
        coverImage: {
          url: "",
          publicId: "",
        },
      },
      {
        title: "Editorial Inspiration",
        slug: "editorial-inspiration",
        description: "Editorial and publication references.",
        coverImage: {
          url: "",
          publicId: "",
        },
      },
    ],
  });

  console.log("✅ Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });