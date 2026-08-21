import Product from '../models/Product.js';
import Order from '../models/Order.js';

// Knowledge base for Saree Fabrics & Traditions
const fabricKnowledge = {
  kanchipuram: {
    name: "Kanchipuram Silk",
    desc: "Originating from Kanchipuram, Tamil Nadu. Known for heavy mulberry silk texture, 3-ply yarn durability, and grand Korvai zari borders where border and body are woven separately and interlocked."
  },
  banarasi: {
    name: "Banarasi Silk",
    desc: "Woven in Varanasi, Uttar Pradesh. Famous for intricate Kadwa floral jaals, gold/silver metallic threads (Zari), and opulent brocade weaving suitable for royal celebrations."
  },
  kerala: {
    name: "Kerala Kasavu",
    desc: "Traditional handloom cotton or tissue saree from Kerala characterized by off-white/cream fabric with pure gold kasavu borders. Perfect for Onam, Vishu, and traditional ceremonies."
  },
  chanderi: {
    name: "Chanderi Silk",
    desc: "Originating from Madhya Pradesh. Lightweight translucent saree featuring sheer texture, fine silk-cotton mix, and glistening metallic coin/floral motifs."
  },
  organza: {
    name: "Tissue Organza",
    desc: "Crisp, lightweight, sheer fabric with a glass-like sheen. Often embellished with delicate hand zardozi borders or pearl embroidery for modern evening wear."
  },
  georgette: {
    name: "Viscose Georgette",
    desc: "Fluid, bouncy, bouncy drape with a slightly puckered surface. Ideal for Chikankari embroidery and easy evening party drapes."
  },
  tussar: {
    name: "Wild Tussar Silk",
    desc: "Rich textured natural silk produced from wild silkworms. Known for its rich honey-gold tone, breathability, and Ajrakh/Kalamkari hand block prints."
  },
  linen: {
    name: "Pure Organic Linen",
    desc: "Crafted from 100-count organic European flax yarn. Ultra-breathable, minimalist luxury drape ideal for summer events, office, and casual sophistication."
  }
};

// Website Policy FAQs
const websitePolicies = {
  shipping: "We offer complimentary express insured air shipping on orders above ₹15,000 across India. Standard orders are delivered within 3-5 business days.",
  returns: "We offer a 7-day hassle-free return policy for unworn sarees with original tags and SilkMark certification intact.",
  payments: "We accept Razorpay, UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).",
  authenticity: "Every pure silk saree from VASANA comes with an official government-certified SilkMark purity tag."
};

/**
 * Detect Intent & Extract Query Parameters from Natural Language Message
 */
export const detectIntent = (text) => {
  const lower = text.toLowerCase().trim();

  // Intent 1: Human Support
  if (lower.includes('human') || lower.includes('agent') || lower.includes('support') || lower.includes('help line') || lower.includes('phone number')) {
    return { intent: 'HUMAN_SUPPORT' };
  }

  // Intent 2: Order Status Tracking
  if (lower.includes('order') || lower.includes('tracking') || lower.includes('where is my') || lower.includes('track')) {
    return { intent: 'ORDER_STATUS' };
  }

  // Intent 3: Website Policy FAQs
  if (lower.includes('shipping') || lower.includes('delivery time') || lower.includes('dispatch')) {
    return { intent: 'SHIPPING', answer: websitePolicies.shipping };
  }
  if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange')) {
    return { intent: 'RETURN_POLICY', answer: websitePolicies.returns };
  }
  if (lower.includes('payment') || lower.includes('cod') || lower.includes('upi') || lower.includes('card')) {
    return { intent: 'PAYMENT', answer: websitePolicies.payments };
  }
  if (lower.includes('silkmark') || lower.includes('authentic') || lower.includes('pure silk')) {
    return { intent: 'AUTHENTICITY', answer: websitePolicies.authenticity };
  }

  // Intent 4: Fabric Knowledge Comparison
  if (lower.includes('difference between') || lower.includes('what is') || lower.includes('tell me about') || lower.includes('fabric info')) {
    for (const key of Object.keys(fabricKnowledge)) {
      if (lower.includes(key)) {
        return { intent: 'FABRIC_INFORMATION', fabricKey: key, info: fabricKnowledge[key] };
      }
    }
  }

  // Intent 5: Product Search & Recommendation Filters
  let category = null;
  let fabric = null;
  let color = null;
  let occasion = null;
  let maxPrice = null;
  let minPrice = null;

  // Extract Price Constraints
  const underMatch = lower.match(/(under|below|less than|within|around)\s*₹?\s*(\d+)/i) || lower.match(/₹?\s*(\d+)\s*(under|below)/i);
  if (underMatch) {
    maxPrice = parseInt(underMatch[1] || underMatch[2], 10);
  }

  // Extract Categories
  if (lower.includes('banarasi')) category = 'Banarasi';
  else if (lower.includes('kanjivaram') || lower.includes('kanjeevaram')) category = 'Kanjeevaram';
  else if (lower.includes('chanderi')) category = 'Chanderi';
  else if (lower.includes('organza')) category = 'Organza';
  else if (lower.includes('linen')) category = 'Linen';
  else if (lower.includes('georgette')) category = 'Georgette';
  else if (lower.includes('tussar')) category = 'Tussar Silk';
  else if (lower.includes('velvet')) category = 'Velvet';
  else if (lower.includes('kerala') || lower.includes('kasavu')) category = 'Handloom Cotton';

  // Extract Fabrics
  if (lower.includes('silk')) fabric = 'Silk';
  else if (lower.includes('cotton')) fabric = 'Cotton';
  else if (lower.includes('linen')) fabric = 'Linen';
  else if (lower.includes('organza')) fabric = 'Organza';

  // Extract Colors
  if (lower.includes('red') || lower.includes('crimson') || lower.includes('maroon')) color = 'Red';
  else if (lower.includes('green') || lower.includes('emerald') || lower.includes('sage') || lower.includes('pistachio')) color = 'Green';
  else if (lower.includes('blue') || lower.includes('midnight') || lower.includes('teal')) color = 'Blue';
  else if (lower.includes('gold') || lower.includes('mustard') || lower.includes('yellow')) color = 'Gold';
  else if (lower.includes('pink') || lower.includes('rose') || lower.includes('peach')) color = 'Rose';
  else if (lower.includes('white') || lower.includes('ivory') || lower.includes('cream')) color = 'White';
  else if (lower.includes('purple') || lower.includes('plum') || lower.includes('lavender')) color = 'Plum';
  else if (lower.includes('orange')) color = 'Orange';

  // Extract Occasions
  if (lower.includes('wedding') || lower.includes('bride') || lower.includes('bridal') || lower.includes('marriage')) occasion = 'Wedding';
  else if (lower.includes('festive') || lower.includes('festival') || lower.includes('diwali') || lower.includes('onam') || lower.includes('pooja')) occasion = 'Festive';
  else if (lower.includes('party') || lower.includes('reception') || lower.includes('evening')) occasion = 'Party';
  else if (lower.includes('everyday') || lower.includes('casual') || lower.includes('office')) occasion = 'Everyday';

  if (category || fabric || color || occasion || maxPrice) {
    return {
      intent: 'PRODUCT_SEARCH',
      filters: { category, fabric, color, occasion, maxPrice, minPrice }
    };
  }

  return { intent: 'GENERAL_QUESTION' };
};

/**
 * Execute MongoDB query based on intent filters
 */
export const searchProductsInDB = async (filters) => {
  try {
    let query = {};

    if (filters.category) {
      query.category = { $regex: filters.category, $options: 'i' };
    }
    if (filters.fabric) {
      query.fabric = { $regex: filters.fabric, $options: 'i' };
    }
    if (filters.color) {
      query.color = { $regex: filters.color, $options: 'i' };
    }
    if (filters.occasion) {
      query.occasion = { $regex: filters.occasion, $options: 'i' };
    }
    if (filters.maxPrice) {
      query.price = { $lte: filters.maxPrice };
    }

    let products = await Product.find(query).sort({ rating: -1, reviewCount: -1 }).limit(6);

    // Fallback relaxation if no strict matches
    if (products.length === 0 && (filters.category || filters.occasion)) {
      let relaxedQuery = {};
      if (filters.category) relaxedQuery.category = { $regex: filters.category, $options: 'i' };
      if (filters.occasion) relaxedQuery.occasion = { $regex: filters.occasion, $options: 'i' };
      products = await Product.find(relaxedQuery).limit(4);
    }

    return products;
  } catch (error) {
    console.error('Error searching chatbot products:', error);
    return [];
  }
};
