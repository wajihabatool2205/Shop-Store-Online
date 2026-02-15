
import { Product } from './types';

export const SHOP_NAME = "LUMINA";
export const SHOP_TAGLINE = "Elevated essentials for a thoughtful home.";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Travertine Coffee Table",
    price: 850,
    category: "Furniture",
    description: "A solid travertine table with natural textures and a minimalist geometric profile.",
    image: "https://picsum.photos/seed/table1/800/800"
  },
  {
    id: 2,
    name: "Sculptural Ceramic Vase",
    price: 120,
    category: "Decor",
    description: "Hand-thrown ceramic vase with a matte sand finish. Each piece is unique.",
    image: "https://picsum.photos/seed/vase2/800/800"
  },
  {
    id: 3,
    name: "Pendant Sphere Light",
    price: 340,
    category: "Lighting",
    description: "Frosted glass globe with brushed brass hardware. Provides soft, diffused lighting.",
    image: "https://picsum.photos/seed/light3/800/800"
  },
  {
    id: 4,
    name: "Linen Lounge Chair",
    price: 1200,
    category: "Furniture",
    description: "Deep-seated lounge chair upholstered in Belgian linen. Solid oak frame.",
    image: "https://picsum.photos/seed/chair4/800/800"
  },
  {
    id: 5,
    name: "Botanical Incense Set",
    price: 45,
    category: "Wellness",
    description: "A curated set of 30 sticks featuring sandalwood, cedar, and hinoki notes.",
    image: "https://picsum.photos/seed/wellness5/800/800"
  },
  {
    id: 6,
    name: "Brushed Steel Table Lamp",
    price: 210,
    category: "Lighting",
    description: "Industrial-inspired table lamp with an adjustable neck and warm LED integration.",
    image: "https://picsum.photos/seed/lamp6/800/800"
  },
  {
    id: 7,
    name: "Wool Bouclé Throw",
    price: 180,
    category: "Decor",
    description: "Heavyweight wool throw in ivory bouclé. Perfect for layering on beds or sofas.",
    image: "https://picsum.photos/seed/throw7/800/800"
  },
  {
    id: 8,
    name: "Minimalist Oak Sideboard",
    price: 1450,
    category: "Furniture",
    description: "Four-door sideboard in light oak with invisible handles and soft-close drawers.",
    image: "https://picsum.photos/seed/sideboard8/800/800"
  }
];

export const CATEGORIES: string[] = ['All', 'Furniture', 'Lighting', 'Decor', 'Wellness'];
