import { Package, Shirt, Target } from "lucide-react";

export const categories = [
  { id: "All", label: "All Products", icon: Package },
  { id: "Men", label: "Men's Wear", icon: Shirt },
  { id: "Ladies", label: "Ladies Wear", icon: Shirt },
  { id: "Kids", label: "Kids Wear", icon: Shirt },
  { id: "Sports", label: "Sports Wear", icon: Target }
];

export const products = [
  // Men's Wear
  {
    id: 1,
    category: "Men",
    image: "/cal.webp",
    features: ["3D Raised Effect", "Wash Resistant", "Silicone Ink"]
  },
  {
    id: 2,
    category: "Men",
    image: "/2.webp",
    features: ["Soft Hand Feel", "Stretch Compatible", "Breathable"]
  },
  {
    id: 3,
    category: "Men",
    image: "/21.webp",
    features: ["Distressed Look", "Stone Wash Safe", "Pigment Ink"]
  },
  {
    id: 4,
    category: "Men",
    image: "/boos.webp",
    features: ["Metallic Finish", "Heat Transfer", "Industrial Style"]
  },
  {
    id: 5,
    category: "Men",
    image: "/d.webp",
    features: ["High Opacity", "Color Vibrancy", "Sharp Edges"]
  },
  {
    id: 6,
    category: "Men",
    image: "/cf.webp",
    features: ["High Opacity", "Color Vibrancy", "Sharp Edges"]
  },
  // Ladies Wear
  {
    id: 7,
    category: "Ladies",
    image: "/22.webp",
    features: ["Eco-Friendly Ink", "Fine Detail", "Soft Finish"]
  },
  {
    id: 8,
    category: "Ladies",
    image: "/20.webp",
    features: ["Tonal Print", "Waistband Detail", "Minimalist"]
  },
  {
    id: 9,
    category: "Ladies",
    image: "/ck-l.webp",
    features: ["All-Over Print", "Rotary Screen", "Color Fast"]
  },
  {
    id: 10,
    category: "Ladies",
    image: "/ck-l2.webp",
    features: ["Precision Placement", "Glitter/Shimmer", "Fashion Accent"]
  },
  {
    id: 11,
    category: "Ladies",
    image: "/ck-l3.webp",
    features: ["Abrasion Resistant", "Technical Look", "Heavy Ink"]
  }, 
  {
    id: 12,
    category: "Ladies",
    image: "/hg.webp",
    features: ["Abrasion Resistant", "Technical Look", "Heavy Ink"]
  },
  // Kids Wear
  {
    id: 13,
    category: "Kids",
    image: "/23.webp",
    features: ["Chemical-Free", "Soft Fabric", "Fun Designs"]
  },
  {
    id: 14,
    category: "Kids",
    image: "/v.webp",
    features: ["Reinforced Seams", "Stretchable", "Easy Wash"]
  },
  {
    id: 15,
    category: "Kids",
    image: "/x.webp",
    features: ["Reinforced Seams", "Stretchable", "Easy Wash"]
  },
  // Sports Wear
  {
    id: 16,
    category: "Sports",
    image: "/G1.webp",
    features: ["Moisture-Wicking", "Breathable", "Team Colors"]
  },
  {
    id: 17,
    category: "Sports",
    image: "/G4.webp",
    features: ["Compression Fit", "High Stretch", "Durable Prints"]
  },
  {
    id: 18,
    category: "Sports",
    image: "/G3.webp",
    features: ["Full Set", "Team Branding", "Performance Fabric"]
  },  
  {
    id: 19,
    category: "Sports",
    image: "/G2.webp",
    features: ["Full Set", "Team Branding", "Performance Fabric"]
  },  
];