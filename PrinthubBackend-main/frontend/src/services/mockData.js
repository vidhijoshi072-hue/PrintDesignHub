export const categories = [
  { name: "Food", count: 1240, icon: "Cookie", color: "from-orange-100 to-amber-50" },
  { name: "Cosmetics", count: 890, icon: "Sparkles", color: "from-rose-100 to-pink-50" },
  { name: "Pharma", count: 512, icon: "ShieldPlus", color: "from-sky-100 to-cyan-50" },
  { name: "Beverage", count: 980, icon: "CupSoda", color: "from-emerald-100 to-teal-50" },
  { name: "Retail", count: 430, icon: "ShoppingBag", color: "from-violet-100 to-fuchsia-50" },
  { name: "Wellness", count: 286, icon: "Leaf", color: "from-lime-100 to-green-50" }
];

export const mockDesigns = [
  {
    _id: "pdh-001",
    title: "Artisan Honey Jar Label",
    description: "Warm-toned premium label for organic honey and small-batch food packaging.",
    price: 29,
    category: "Food",
    industry: "FMCG",
    tags: ["organic", "premium", "jar"],
    likes: 148,
    downloads: 342,
    imageUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    designerId: "designer-ava",
    designer: { _id: "designer-ava", firstName: "Ava", lastName: "Morgan", email: "ava@example.com", avatar: "AM" }
  },
  {
    _id: "pdh-002",
    title: "Clinical Serum Sleeve",
    description: "Clean clinical label built for dermatology and cosmetic treatment lines.",
    price: 46,
    category: "Cosmetics",
    industry: "Beauty",
    tags: ["serum", "clinical", "skincare"],
    likes: 219,
    downloads: 501,
    imageUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    designerId: "designer-noah",
    designer: { _id: "designer-noah", firstName: "Noah", lastName: "Lee", email: "noah@example.com", avatar: "NL" }
  },
  {
    _id: "pdh-003",
    title: "Nutraceutical Bottle Wrap",
    description: "Regulated layout with dosage hierarchy for supplement and pharma brands.",
    price: 55,
    category: "Pharma",
    industry: "Healthcare",
    tags: ["bottle", "supplement", "regulatory"],
    likes: 174,
    downloads: 280,
    imageUrl:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=80",
    designerId: "designer-mia",
    designer: { _id: "designer-mia", firstName: "Mia", lastName: "Chen", email: "mia@example.com", avatar: "MC" }
  },
  {
    _id: "pdh-004",
    title: "Cold Brew Can System",
    description: "Bold beverage label set with modular flavor badges and shelf-ready contrast.",
    price: 38,
    category: "Beverage",
    industry: "Beverage",
    tags: ["can", "coffee", "modern"],
    likes: 267,
    downloads: 612,
    imageUrl:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
    designerId: "designer-ethan",
    designer: { _id: "designer-ethan", firstName: "Ethan", lastName: "Brooks", email: "ethan@example.com", avatar: "EB" }
  },
  {
    _id: "pdh-005",
    title: "Minimal Candle Collection",
    description: "Muted luxury label system for boutique home fragrance and decor products.",
    price: 34,
    category: "Retail",
    industry: "Lifestyle",
    tags: ["luxury", "candle", "minimal"],
    likes: 193,
    downloads: 361,
    imageUrl:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
    designerId: "designer-sofia",
    designer: { _id: "designer-sofia", firstName: "Sofia", lastName: "Patel", email: "sofia@example.com", avatar: "SP" }
  },
  {
    _id: "pdh-006",
    title: "Herbal Tea Sachet Series",
    description: "Soft wellness packaging with ingredient-forward storytelling panels.",
    price: 31,
    category: "Wellness",
    industry: "Wellness",
    tags: ["tea", "herbal", "sachet"],
    likes: 121,
    downloads: 248,
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    designerId: "designer-liam",
    designer: { _id: "designer-liam", firstName: "Liam", lastName: "Rivera", email: "liam@example.com", avatar: "LR" }
  }
];

export const companySavedDesigns = ["pdh-002", "pdh-004", "pdh-006"];

export const companyOrders = [
  { id: "ORD-2401", date: "2026-03-10", total: 84, status: "Delivered" },
  { id: "ORD-2388", date: "2026-03-08", total: 31, status: "Completed" },
  { id: "ORD-2364", date: "2026-03-02", total: 55, status: "Delivered" }
];

export const designerSales = [
  { month: "Nov", sales: 1200 },
  { month: "Dec", sales: 1800 },
  { month: "Jan", sales: 2100 },
  { month: "Feb", sales: 2600 },
  { month: "Mar", sales: 3120 }
];
