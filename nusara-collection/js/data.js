// Nusara Collection - Data Store & Catalog
// Luxury Indonesian Modest Fashion Curated for Maldives

const NUSARA_DATA = {
  brand: {
    name: "NUSARA COLLECTION",
    tagline: "Curated Indonesian Modest Wear for Maldives",
    heroTitle: "Indonesian Modest Elegance, Curated for Maldives' Island Splendor",
    heroSubtitle: "Breathable pure linens, whisper-light raw silks, and contemporary modest silhouettes crafted by Indonesia's premier fashion artisans for tropical resort living and island celebrations.",
    phoneWhatsApp: "6281234567890", // Ganti dengan nomor WhatsApp resmi Nusara
    displayWhatsApp: "+62 812-3456-7890",
    email: "concierge@nusaracollection.com",
    locations: [
      { city: "Jakarta Atelier", country: "Indonesia", desc: "Design curation & quality inspection studio" },
      { city: "Malé & Hulhumalé", country: "Maldives", desc: "Express delivery & private resort concierge" }
    ]
  },

  currencyRates: {
    USD: { symbol: "$", rate: 1, label: "USD ($)", format: (val) => `$${val.toFixed(0)}` },
    MVR: { symbol: "Rf", rate: 15.42, label: "MVR (Rf)", format: (val) => `Rf ${(val * 15.42).toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
    IDR: { symbol: "Rp", rate: 16000, label: "IDR (Rp)", format: (val) => `Rp ${(val * 16000).toLocaleString('id-ID')}` }
  },

  categories: [
    { id: "all", name: "All Curations", count: 8 },
    { id: "resort-linen", name: "Resort Linen & Sets", count: 3 },
    { id: "silk-abayas", name: "Silk Crepe & Abayas", count: 2 },
    { id: "kaftans", name: "Flowy Island Kaftans", count: 2 },
    { id: "artisanal", name: "Artisanal & Eco-Print", count: 1 }
  ],

  products: [
    {
      id: "nc-01",
      name: "The Baa Atoll Linen Abaya",
      sku: "BAA-LNN-01",
      category: "resort-linen",
      priceUSD: 185,
      tag: "Best Seller",
      designer: "Studio Senja Bandung",
      fabric: "100% Breathable Enzyme-Washed Linen",
      climateSuitability: "5/5 Ultra-Breathable for Island Heat",
      opacity: "Full Coverage (Non-sheer)",
      colors: ["Sand Dune", "Sage Mist", "Ocean Navy"],
      sizes: ["S-M", "L-XL", "Custom Resort Length"],
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      shortDesc: "An effortlessly drapeable modest abaya tailored from enzyme-washed Indonesian linen. Designed for barefoot strolls and sea-breeze evenings.",
      description: "Crafted specifically for the warm ocean climate of the Maldives, the Baa Atoll Abaya fuses Indonesian tailoring mastery with European-standard natural flax linen. The silhouette is generously cut for maximum air circulation while providing complete modest coverage. Features concealed coconut-shell buttons and relaxed kimono sleeves.",
      stylingNotes: "Pairs beautifully with flat leather slides for sunset strolls, or style with a silk chiffon headscarf and gold cuffs for beachfront private dinners."
    },
    {
      id: "nc-02",
      name: "Soneva Mulberry Silk Crepe Kaftan",
      sku: "SNV-SLK-02",
      category: "silk-abayas",
      priceUSD: 240,
      tag: "Curator's Pick",
      designer: "Atelier Dian Jakarta",
      fabric: "Pure Mulberry Silk Crepe with Bamboo Lining",
      climateSuitability: "4.8/5 Cooling & Featherlight",
      opacity: "Full Coverage with Double Crepe Weave",
      colors: ["Sunset Coral", "Warm Champagne", "Pearl Ivory"],
      sizes: ["Free Size (Drapes S to XXL)"],
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      shortDesc: "A whisper-light pure silk crepe kaftan with hand-rolled hems, inspired by the glowing sunsets of Noonu Atoll.",
      description: "Sourced from Indonesian sericulture artisans, this pure silk crepe kaftan drapes like liquid light. Highly breathable and naturally thermal-regulating, keeping you cool under the Maldivian afternoon sun and regal for evening celebrations at overwater villas.",
      stylingNotes: "Wear open over tailored linen trousers, or fasten the interior waist ties for a cinched, fluid silhouette."
    },
    {
      id: "nc-03",
      name: "Dhigufaru Tiered Resort Tunic Set",
      sku: "DHF-TNC-03",
      category: "resort-linen",
      priceUSD: 165,
      tag: "Resort Essential",
      designer: "Ruma Modest Yogyakarta",
      fabric: "Cooling Tencel Modal & Flax Blend",
      climateSuitability: "5/5 Anti-Humidity & Soft",
      opacity: "Full Coverage",
      colors: ["Ivory Mist", "Earthy Terracotta", "Olive Grove"],
      sizes: ["S", "M", "L", "XL"],
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
      shortDesc: "Two-piece modest set featuring a tiered high-low tunic and wide-leg palazzo pants. Your go-to Maldives vacation staple.",
      description: "Designed for effortless modest resort living. The fabric is a specialized Tencel-modal and flax blend developed in Central Java, renowned for its soft touch against sun-kissed skin and rapid moisture-wicking properties during humid island days.",
      stylingNotes: "Comes with matching belt. Style with oversized tortoise sunglasses and a woven rattan tote for island excursions."
    },
    {
      id: "nc-04",
      name: "Malé Atoll Organza Duster & Slip Set",
      sku: "MLE-ORG-04",
      category: "silk-abayas",
      priceUSD: 215,
      tag: "Luxury Edition",
      designer: "Kalyana Jakarta Haute",
      fabric: "Silk Organza Outer & Breathable Rayon Viscose Slip",
      climateSuitability: "4.7/5 Light as Air",
      opacity: "Opaque (Inner slip included)",
      colors: ["Sea Salt White", "Dusty Lavender", "Onyx Glow"],
      sizes: ["S", "M", "L"],
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
      shortDesc: "Ethereal semi-sheer silk organza outer robe paired with a full-length, high-neck breathable cooling slip.",
      description: "A favorite for Friday galas, Maldivian destination weddings, and formal yacht dinners. The outer duster catches the tropical breeze with architectural grace, while the custom Indonesian bamboo-rayon slip ensures complete modesty without overheating.",
      stylingNotes: "Wear with metallic heeled sandals and statement mother-of-pearl earrings."
    },
    {
      id: "nc-05",
      name: "Archipelago Botanical Eco-Print Maxi",
      sku: "ARC-ECO-05",
      category: "artisanal",
      priceUSD: 195,
      tag: "Artisanal One-of-a-Kind",
      designer: "Pertiwi Natural Dye Bali",
      fabric: "Hand-Steamed Botanical Rayon Silk",
      climateSuitability: "5/5 Natural Plant Fibers",
      opacity: "Full Modest Coverage",
      colors: ["Eucalyptus Drift", "Indigo Wave", "Cinnamon Ochre"],
      sizes: ["S-M", "L-XL"],
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
      shortDesc: "Each piece is naturally printed with real teak and eucalyptus leaves using age-old Indonesian steam techniques.",
      description: "No two pieces are alike. Created by an artisan cooperative in Indonesia, this dress uses fallen tropical leaves steamed directly onto breathable rayon silk. An ode to nature, perfectly at home in the untouched beauty of the Maldivian coral atolls.",
      stylingNotes: "Pairs with minimal neutral accessories to let the organic leaf silhouettes take center stage."
    },
    {
      id: "nc-06",
      name: "Maafushi Breezy Kimono & Trouser",
      sku: "MFS-KMN-06",
      category: "resort-linen",
      priceUSD: 170,
      tag: "Everyday Island",
      designer: "Tenun Living Pekalongan",
      fabric: "Slub Linen-Cotton Blend",
      climateSuitability: "5/5 Crisp & Airy",
      opacity: "Opaque",
      colors: ["Sand Dune", "Turquoise Lagoon", "Pale Almond"],
      sizes: ["S", "M", "L", "XL"],
      image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
      shortDesc: "Casual modest luxury for island hopping, café visits in Malé, and shaded relaxation.",
      description: "Featuring a tailored ankle-skimming kimono with clean notched lapels and elasticated wide-leg culottes with deep pockets. Crafted from a textured slub linen weave that resists tropical humidity cling.",
      stylingNotes: "Slip on over your favorite swimsuit for instant modest transition from private villa pool to resort restaurant."
    },
    {
      id: "nc-07",
      name: "Veligandu Pleated Silk Maxi Kaftan",
      sku: "VLG-PLT-07",
      category: "kaftans",
      priceUSD: 225,
      tag: "Exclusive",
      designer: "Nusara Signature Atelier",
      fabric: "Micro-Pleated Chiffon Silk with Cotton Voile Lining",
      climateSuitability: "4.9/5 Fluid & Weightless",
      opacity: "100% Modest Opaque",
      colors: ["Terracotta Dusk", "Seashell Pink", "Deep Emerald"],
      sizes: ["Free Size (Fit 36-46 EU)"],
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
      shortDesc: "Masterfully micro-pleated for fluid movement that mimics the gentle ocean tides.",
      description: "An iconic Nusara statement silhouette. Hundreds of micro-pleats create a sculptural, flattering shape that flows effortlessly as you walk. Accompanied by a breathable cotton-voile slip tailored for high-temperature comfort.",
      stylingNotes: "Needs zero ironing - simply roll gently for travel. The ultimate suitcase-ready resort piece."
    },
    {
      id: "nc-08",
      name: "The Atoll Sun-Shield Embroidered Cape",
      sku: "ATL-SHL-08",
      category: "kaftans",
      priceUSD: 145,
      tag: "New Arrival",
      designer: "Tasikmalaya Embroidery Guild",
      fabric: "Air-Weave Cotton Voile with Silk Threading",
      climateSuitability: "5/5 Lightweight Sun Protection",
      opacity: "Light Modest Layer",
      colors: ["Warm Ivory", "Sage Green", "Charcoal Mist"],
      sizes: ["One Size"],
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      shortDesc: "Hand-embroidery on featherweight cotton voile, providing modest shoulder and arm coverage under bright island sun.",
      description: "Tasikmalaya, West Java is world-famous for its delicate heritage embroidery. This modern cape translates historic motifs into subtle geometric borders. Designed to be draped across simple abayas or sleeveless slips for instant modest refinement.",
      stylingNotes: "Folds down to the size of a handkerchief. Keep one in your beach bag at all times."
    }
  ],

  resortConciergeFeatures: [
    {
      icon: "sun",
      title: "Breathable Island Fabrics",
      desc: "Every piece is curated with 100% natural fibers (linen, mulberry silk, cooling tencel) tested for high-humidity atoll climates."
    },
    {
      icon: "compass",
      title: "Direct Maldives Delivery",
      desc: "Fast delivery to Malé City, Hulhumalé, and coordinated speedboat / seaplane transfer directly to your luxury resort villa."
    },
    {
      icon: "sparkles",
      title: "Bespoke Resort Styling",
      desc: "Send us your vacation dates or event itinerary. Our Jakarta-Malé concierge curates a custom lookbook tailored to your aesthetic."
    },
    {
      icon: "shield-check",
      title: "Curated Indonesian Craft",
      desc: "We work directly with Indonesia's most respected modest designers and ethical artisan guilds — never mass-produced."
    }
  ],

  testimonials: [
    {
      quote: "Finding modest wear that doesn't feel suffocating in Maldives' tropical heat was almost impossible until Nusara. The Baa Atoll Linen Abaya is a revelation — chic, dignified, and so cool.",
      author: "Aishath N.",
      location: "Malé, Maldives",
      product: "The Baa Atoll Linen Abaya"
    },
    {
      quote: "Nusara delivered our resort lookbook directly to our villa at Soneva Fushi via seaplane transfer. The packaging was exquisite, and the silk crepe kaftan was the highlight of our vacation dinners.",
      author: "Dr. Fatima & Zayd",
      location: "Dubai / Vacationing in Maldives",
      product: "Soneva Silk Crepe Kaftan"
    },
    {
      quote: "Indonesian modest fashion is leagues ahead in design, and Nusara curates only the best pieces for our island lifestyle. The fabrics breathe so well even during humid midday.",
      author: "Mariyam R.",
      location: "Hulhumalé, Maldives",
      product: "Dhigufaru Tiered Resort Tunic"
    }
  ],

  faq: [
    {
      q: "How does delivery to Malé and Maldives luxury resorts work?",
      a: "We maintain curated stock between our Jakarta atelier and our Malé concierge partners. For Malé and Hulhumalé addresses, delivery takes 1-3 business days. For private island resorts (Baa, Noonu, North/South Malé Atolls), we coordinate delivery via registered speedboat transfer or resort seaplane concierge directly to your island."
    },
    {
      q: "What makes Indonesian modest fashion ideal for the Maldives?",
      a: "Indonesia is a tropical archipelago just like the Maldives. Indonesian designers have perfected the art of creating modest wear that offers complete coverage without trapping heat, utilizing enzyme-washed flax linen, mulberry silk, and bamboo tencel designed specifically for equatorial climates."
    },
    {
      q: "How do I order or request custom sizing?",
      a: "Because each piece is curated and often crafted in small artisan batches, our primary service is personalized Concierge Shopping. You can click 'Inquire via WhatsApp' on any piece or curate a Lookbook Bag to send directly to our stylist. We confirm your measurements, delivery date, and payment via secure link."
    },
    {
      q: "What currencies and payment methods are accepted?",
      a: "We accept payments in USD ($) and Maldivian Rufiyaa (MVR) via Maldivian Bank of Maldives (BML) transfer, international Visa/Mastercard payment links, and Indonesian Rupiah (IDR) via Bank Transfer."
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.NUSARA_DATA = NUSARA_DATA;
}
