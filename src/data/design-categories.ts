export type DesignCategorySlug = "social-media-designs" | "anime-shoes-mockups" | "amway-flyers";

export interface DesignCategory {
  slug: DesignCategorySlug;
  title: string;
  description: string;
  coverSrc: string;
  coverAlt: string;
  href: string;
}

export const designCategories: DesignCategory[] = [
  {
    slug: "social-media-designs",
    title: "Social Media Designs",
    description: "Square social posts for food, drink, tech, and gaming promos.",
    coverSrc: "/assets/social-media-designs/drink-social-media.png",
    coverAlt: "Drink social media design cover",
    href: "/designs/social-media-designs",
  },
  {
    slug: "anime-shoes-mockups",
    title: "Anime Shoes Mockups",
    description: "Demon Slayer character shoe mockups.",
    coverSrc: "/assets/shoes-mockup/Tanjiro.png",
    coverAlt: "Tanjiro Demon Slayer shoe mockup cover",
    href: "/designs/anime-shoes-mockups",
  },
  {
    slug: "amway-flyers",
    title: "Amway Flyers",
    description: "Print flyers for Amway products and promos.",
    coverSrc: "/assets/amway-fliers/Amway - Fliers (1).jpg",
    coverAlt: "Amway flyer cover",
    href: "/designs/amway-flyers",
  },
];
