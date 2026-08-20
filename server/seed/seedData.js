import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Blog from '../models/Blog.js';
import Order from '../models/Order.js';

dotenv.config();

const sampleSarees = [
  {
    name: "Royal Crimson Kanjivaram Pure Silk Saree",
    slug: "royal-crimson-kanjivaram-pure-silk-saree",
    description: "Handwoven in Kanchipuram with pure mulberry silk and authentic zari borders featuring traditional peacock and chakra motifs. A timeless heirloom piece for grand wedding celebrations.",
    price: 34999,
    discount: 10,
    category: "Kanjeevaram",
    fabric: "Pure Kanjivaram Silk",
    color: "Crimson Red",
    occasion: "Bridal",
    collectionType: "Wedding Edit",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 8,
    sku: "VSN-KNJ-001",
    sareeLength: "5.5 meters",
    blouseLength: "0.8 meters unstitched pure silk",
    rating: 4.9,
    reviewCount: 18,
    featured: true,
    newArrival: true,
    craftStory: "Woven meticulously by master artisans in Kanchipuram using 3-ply silk threads over 240 hours.",
    careInstructions: "Dry clean only. Wrap in soft unbleached cotton muslin cloth."
  },
  {
    name: "Varanasi Antique Gold Zari Banarasi Silk",
    slug: "varanasi-antique-gold-zari-banarasi-silk",
    description: "Exquisite Banarasi silk saree crafted with dense Kadwa weave, delicate floral jaal work, and intricate antique gold zari pallu.",
    price: 28500,
    discount: 15,
    category: "Banarasi",
    fabric: "Banarasi Katan Silk",
    color: "Emerald Green",
    occasion: "Wedding",
    collectionType: "Silk Stories",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 12,
    sku: "VSN-BNR-002",
    rating: 4.8,
    reviewCount: 24,
    featured: true,
    newArrival: false,
    craftStory: "Crafted on traditional pit looms in Varanasi by hereditary handloom weavers.",
    careInstructions: "Dry clean only. Avoid spraying perfume directly on zari work."
  },
  {
    name: "Subtle Rose Organza Saree with Hand Embroidery",
    slug: "subtle-rose-organza-saree-with-hand-embroidery",
    description: "Lightweight ethereal tissue organza saree embellished with delicate zardozi border work and pearl highlights.",
    price: 18900,
    discount: 5,
    category: "Organza",
    fabric: "Tissue Silk Organza",
    color: "Dusty Rose",
    occasion: "Party",
    collectionType: "Everyday Grace",
    images: [
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 6,
    sku: "VSN-ORG-003",
    rating: 4.7,
    reviewCount: 9,
    featured: true,
    newArrival: true,
    craftStory: "Hand-embroidery takes 45 craftsman hours per saree in our Jaipur studio.",
    careInstructions: "Dry clean only. Store flat without heavy compression."
  },
  {
    name: "Midnight Blue Chanderi Zari Stripe Saree",
    slug: "midnight-blue-chanderi-zari-stripe-saree",
    description: "Classic Chanderi silk cotton saree with fine silver zari stripes and translucent lustrous texture.",
    price: 12400,
    discount: 0,
    category: "Chanderi",
    fabric: "Chanderi Silk Cotton",
    color: "Midnight Blue",
    occasion: "Festive",
    collectionType: "Festive Collection",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 15,
    sku: "VSN-CND-004",
    rating: 4.6,
    reviewCount: 14,
    featured: false,
    newArrival: true,
    craftStory: "Woven in Chanderi, Madhya Pradesh using natural silk and mercerized cotton yarns.",
    careInstructions: "Dry clean recommended. Gentle hand wash in cold water with mild detergent."
  },
  {
    name: "Maroon Velvet Embroidered Heritage Saree",
    slug: "maroon-velvet-embroidered-heritage-saree",
    description: "Opulent micro-velvet saree with heavy marodi and dabka embroidery. Designed for winter weddings and evening soirées.",
    price: 42000,
    discount: 12,
    category: "Velvet",
    fabric: "Royal Micro Velvet & Net",
    color: "Maroon",
    occasion: "Bridal",
    collectionType: "Royalty",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 4,
    sku: "VSN-VLV-005",
    rating: 5.0,
    reviewCount: 7,
    featured: true,
    newArrival: false,
    craftStory: "Features hand-cut velvet appliques stitched with vintage metallic bullion threads.",
    careInstructions: "Strictly dry clean only."
  },
  {
    name: "Honey Gold Tussar Silk Hand Block Print",
    slug: "honey-gold-tussar-silk-hand-block-print",
    description: "Authentic wild Tussar silk saree adorned with eco-friendly Ajrakh hand block prints and hand-knotted tassels.",
    price: 15800,
    discount: 10,
    category: "Tussar Silk",
    fabric: "Pure Wild Tussar Silk",
    color: "Mustard Gold",
    occasion: "Everyday",
    collectionType: "Everyday Grace",
    images: [
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 10,
    sku: "VSN-TSR-006",
    rating: 4.8,
    reviewCount: 11,
    featured: false,
    newArrival: true,
    craftStory: "Sourced from Bhagalpur weavers with hand block motifs from Kutch.",
    careInstructions: "Dry clean only."
  },
  {
    name: "Ivory Pastel Georgette Chikankari Saree",
    slug: "ivory-pastel-georgette-chikankari-saree",
    description: "Pure viscose georgette saree featuring intricate Lucknowi Chikankari hand embroidery and subtle mukaish work.",
    price: 24900,
    discount: 8,
    category: "Georgette",
    fabric: "Pure Viscose Georgette",
    color: "Ivory White",
    occasion: "Party",
    collectionType: "Festive Collection",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 7,
    sku: "VSN-GRG-007",
    rating: 4.9,
    reviewCount: 15,
    featured: true,
    newArrival: false,
    craftStory: "Crafted by female artisans in Lucknow practicing age-old needlework traditions.",
    careInstructions: "Dry clean only."
  },
  {
    name: "Sage Green Handloom Pure Linen Saree",
    slug: "sage-green-handloom-pure-linen-saree",
    description: "100-count pure organic linen saree with silver zari border and breathable minimalist luxury drape.",
    price: 8990,
    discount: 0,
    category: "Linen",
    fabric: "100% Pure Organic Linen",
    color: "Sage Green",
    occasion: "Everyday",
    collectionType: "Everyday Grace",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 20,
    sku: "VSN-LNN-008",
    rating: 4.7,
    reviewCount: 22,
    featured: false,
    newArrival: true,
    craftStory: "Woven in West Bengal using ethically sourced European flax yarn.",
    careInstructions: "Gentle hand wash with mild liquid soap. Iron while slightly damp."
  },
  {
    name: "Deep Plum Mulberry Silk Jamdani Saree",
    slug: "deep-plum-mulberry-silk-jamdani-saree",
    description: "Fine Mulberry silk Jamdani saree woven with supplementary weft technique creating floating geometric floral motifs.",
    price: 31200,
    discount: 10,
    category: "Banarasi",
    fabric: "Pure Mulberry Silk",
    color: "Deep Plum",
    occasion: "Wedding",
    collectionType: "Silk Stories",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 5,
    sku: "VSN-JMD-009",
    rating: 4.9,
    reviewCount: 12,
    featured: true,
    newArrival: false,
    craftStory: "Jamdani weaving is a UNESCO Intangible Cultural Heritage of Humanity.",
    careInstructions: "Dry clean only."
  },
  {
    name: "Sunburst Orange Kanjivaram Brocade Saree",
    slug: "sunburst-orange-kanjivaram-brocade-saree",
    description: "Vibrant orange Kanjivaram silk saree with contrast magenta border and rich gold zari brocade pallu.",
    price: 38900,
    discount: 5,
    category: "Kanjeevaram",
    fabric: "Kanjivaram Silk",
    color: "Orange",
    occasion: "Bridal",
    collectionType: "Wedding Edit",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 6,
    sku: "VSN-KNJ-010",
    rating: 4.8,
    reviewCount: 16,
    featured: false,
    newArrival: true,
    craftStory: "Korvai hand-weaving technique joining body and border seamlessly.",
    careInstructions: "Dry clean only."
  },
  {
    name: "Teal Blue Bandhani Silk Saree with Gota Patti",
    slug: "teal-blue-bandhani-silk-saree-with-gota-patti",
    description: "Traditional Rajasthani hand-tied Bandhej silk saree adorned with intricate Gota Patti embroidery border.",
    price: 21500,
    discount: 15,
    category: "Georgette",
    fabric: "Artisan Silk Georgette",
    color: "Teal Blue",
    occasion: "Festive",
    collectionType: "Festive Collection",
    images: [
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 9,
    sku: "VSN-BND-011",
    rating: 4.7,
    reviewCount: 8,
    featured: false,
    newArrival: false,
    craftStory: "Over 5,000 tiny knots tied individually before dyeing in Kutch.",
    careInstructions: "Dry clean only."
  },
  {
    name: "Pistachio Green Chanderi Tissue Saree",
    slug: "pistachio-green-chanderi-tissue-saree",
    description: "Glistening pastel green Chanderi tissue silk saree with woven silver zari Meenakari motifs.",
    price: 14600,
    discount: 10,
    category: "Chanderi",
    fabric: "Chanderi Tissue Silk",
    color: "Pistachio Green",
    occasion: "Party",
    collectionType: "Everyday Grace",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 11,
    sku: "VSN-CND-012",
    rating: 4.8,
    reviewCount: 19,
    featured: false,
    newArrival: true,
    craftStory: "Woven using ultra-fine silk warp and metallic tissue weft threads.",
    careInstructions: "Dry clean only."
  }
];

// Additional products generator for catalog richness up to 30 items
const fabricsList = ["Kanjivaram Silk", "Banarasi Katan Silk", "Chanderi Silk", "Tissue Organza", "Pure Linen", "Viscose Georgette", "Tussar Silk"];
const categoriesList = ["Banarasi", "Kanjeevaram", "Chanderi", "Organza", "Linen", "Georgette", "Tussar Silk", "Handloom Cotton"];
const colorsList = ["Ruby Red", "Royal Blue", "Golden Amber", "Peach Blush", "Lavender Mist", "Champagne Gold", "Turquoise", "Wine Burgundy"];
const occasionsList = ["Wedding", "Festive", "Everyday", "Party", "Bridal", "Formal"];
const collectionsList = ["Silk Stories", "Wedding Edit", "Festive Collection", "Everyday Grace", "Royalty"];

for (let i = 13; i <= 30; i++) {
  const cat = categoriesList[(i - 1) % categoriesList.length];
  const fab = fabricsList[(i - 1) % fabricsList.length];
  const col = colorsList[(i - 1) % colorsList.length];
  const occ = occasionsList[(i - 1) % occasionsList.length];
  const coll = collectionsList[(i - 1) % collectionsList.length];
  const price = Math.floor(7500 + (i * 1250));
  
  sampleSarees.push({
    name: `${col} ${cat} Royal Heritage Saree ${i}`,
    slug: `${col.toLowerCase().replace(' ', '-')}-${cat.toLowerCase().replace(' ', '-')}-heritage-saree-${i}`,
    description: `A stunning ${col} ${cat} saree expertly handcrafted with ${fab}. Features grand zari borders, fluid drapes, and opulent ethnic styling suitable for ${occ.toLowerCase()} occasions.`,
    price: price,
    discount: (i % 3 === 0) ? 10 : 0,
    category: cat,
    fabric: fab,
    color: col,
    occasion: occ,
    collectionType: coll,
    images: [
      i % 2 === 0 
        ? "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
        : "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 5 + (i % 10),
    sku: `VSN-${cat.substring(0,3).toUpperCase()}-0${i}`,
    rating: Number((4.5 + (i % 5) * 0.1).toFixed(1)),
    reviewCount: 5 + i,
    featured: i % 4 === 0,
    newArrival: i % 3 === 0,
    craftStory: "Handcrafted by traditional master weavers preserving heritage weaving techniques.",
    careInstructions: "Dry clean only."
  });
}

const sampleBlogs = [
  {
    title: "The Timeless Elegance of Kanjivaram: History, Craft & Draping",
    slug: "the-timeless-elegance-of-kanjivaram-history-craft-draping",
    excerpt: "Discover the centuries-old story behind Kanchipuram silk sarees, from mulberry silk harvesting to master Korvai loom weaving.",
    content: `
      <p>Kanjivaram silk sarees represent the pinnacle of South Indian weaving heritage. Originating from the temple town of Kanchipuram in Tamil Nadu, these sarees are revered for their heavy mulberry silk texture, lustrous gold zari, and remarkable durability.</p>
      <h3>The Art of Korvai Weaving</h3>
      <p>What sets an authentic Kanjivaram apart is the 'Korvai' technique—where the body and the border are woven as separate pieces and subsequently joined together with an intricate zig-zag weave. This interlocking joint is so robust that even if the saree tears, the border will not detach.</p>
      <h3>Styling Your Kanjivaram for Modern Celebrations</h3>
      <p>Pair your heavy Kanjivaram with clean metallic jewelry, a slicked back bun adorned with fresh jasmine (gajra), and a contemporary embroidered raw silk blouse for an effortlessly regal wedding appearance.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    category: "Craft & Culture",
    author: "Ananya Sharma, Senior Fashion Editor",
    readTime: "5 min read"
  },
  {
    title: "5 Essential Care Tips to Preserve Heirloom Silk Sarees",
    slug: "5-essential-care-tips-to-preserve-heirloom-silk-sarees",
    excerpt: "How to properly fold, store, and preserve your precious Banarasi and Kanjivaram silk sarees for generations to come.",
    content: `
      <p>Pure silk sarees are not just garments; they are heirloom treasures passed down from mothers to daughters. Proper care ensures their zari work remains bright and the silk yarn remains supple.</p>
      <ul>
        <li><strong>Always Wrap in Muslin:</strong> Never store silk sarees in plastic bags. Wrap them in unbleached white cotton or muslin fabric so the silk can breathe.</li>
        <li><strong>Refold Periodically:</strong> Take your sarees out every 3 to 4 months, air them in a shaded room, and change the fold lines to prevent permanent creases.</li>
        <li><strong>Avoid Direct Perfumes:</strong> Never spray perfume directly onto metallic zari threads as alcohol oxidizes gold and silver plating.</li>
      </ul>
    `,
    coverImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
    category: "Saree Care",
    author: "Rajesh Varma, Textile Specialist",
    readTime: "4 min read"
  },
  {
    title: "Bridal Saree Guide 2026: Trends, Palettes & Silhouette Styling",
    slug: "bridal-saree-guide-2026-trends-palettes-silhouette-styling",
    excerpt: "From deep wine burgundies to subtle champagne golds, explore the modern Indian bride's ultimate saree palette.",
    content: `
      <p>Modern brides are embracing traditional sarees over heavy lehengas for their timeless Grace and comfortable wearability throughout long wedding rituals.</p>
      <h3>Key Trends for 2026</h3>
      <p>Monochromatic red-on-red zari brocades, jewel-toned velvets for winter receptions, and airy tissue organza sarees for daylight Anand Karaj ceremonies.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80",
    category: "Weddings & Festive",
    author: "VASANA Creative Studio",
    readTime: "6 min read"
  }
];

export const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vasana_sarees';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await Blog.deleteMany({});
    await Order.deleteMany({});

    // Create Admin and Customer Users
    const adminUser = await User.create({
      name: 'VASANA Administrator',
      email: 'admin@example.com',
      password: 'admin123',
      phone: '+91 9876543210',
      role: 'admin',
      addresses: [{
        fullName: 'VASANA HQ',
        phone: '+91 9876543210',
        street: '108 Fashion Avenue, Jubilee Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500033',
        country: 'India',
        isDefault: true
      }]
    });

    const customerUser = await User.create({
      name: 'Priya Sundaram',
      email: 'customer@example.com',
      password: 'customer123',
      phone: '+91 9123456789',
      role: 'customer',
      addresses: [{
        fullName: 'Priya Sundaram',
        phone: '+91 9123456789',
        street: 'Flat 402, Royal Palms Apartments, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        country: 'India',
        isDefault: true
      }]
    });

    console.log('Created Demo Admin & Customer accounts.');

    // Seed Products
    const createdProducts = await Product.insertMany(sampleSarees);
    console.log(`Successfully seeded ${createdProducts.length} saree products.`);

    // Seed Reviews
    const sampleReviews = [
      {
        user: customerUser._id,
        userName: customerUser.name,
        product: createdProducts[0]._id,
        rating: 5,
        comment: "Absolutely breathtaking Kanjivaram saree! The silk is heavy and rich, and the gold zari work glistens beautifully under lights. Received endless compliments at my sister's wedding.",
        verifiedPurchase: true
      },
      {
        user: customerUser._id,
        userName: "Meera Kapoor",
        product: createdProducts[1]._id,
        rating: 5,
        comment: "The Banarasi weaving quality is top-notch. Delivery was fast and the packaging felt like receiving a royal gift box.",
        verifiedPurchase: true
      },
      {
        user: customerUser._id,
        userName: "Radhika Sengupta",
        product: createdProducts[2]._id,
        rating: 4,
        comment: "Lightweight and easy to drape. Perfect for evening garden parties.",
        verifiedPurchase: true
      }
    ];

    await Review.insertMany(sampleReviews);
    console.log('Seeded sample reviews.');

    // Seed Blogs
    await Blog.insertMany(sampleBlogs);
    console.log('Seeded editorial blog posts.');

    // Create Sample Order
    await Order.create({
      user: customerUser._id,
      items: [{
        product: createdProducts[0]._id,
        name: createdProducts[0].name,
        image: createdProducts[0].images[0],
        price: createdProducts[0].price,
        quantity: 1
      }],
      shippingAddress: customerUser.addresses[0],
      payment: {
        method: 'Razorpay',
        status: 'Completed',
        transactionId: 'TXN_VASANA_9988221'
      },
      subtotal: createdProducts[0].price,
      discount: 3499,
      shippingFee: 0,
      tax: 0,
      totalAmount: createdProducts[0].price - 3499,
      status: 'Shipped',
      trackingCode: 'VSN-784920',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    });

    console.log('Seeded sample customer order.');
    console.log('Database Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
};

if (process.argv[1].includes('seedData.js')) {
  seedDatabase();
}
