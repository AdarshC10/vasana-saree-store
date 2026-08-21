import api from './api';
import { fallbackProducts, fallbackOrders } from '../utils/fallbackData';

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

const websitePolicies = {
  shipping: "We offer complimentary express insured air shipping on orders above ₹15,000 across India. Standard orders are delivered within 3-5 business days.",
  returns: "We offer a 7-day hassle-free return policy for unworn sarees with original tags and SilkMark certification intact.",
  payments: "We accept Razorpay, UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).",
  authenticity: "Every pure silk saree from VASANA comes with an official government-certified SilkMark purity tag."
};

/**
 * Send chat message to backend or compute client-side response fallback
 */
export const sendChatMessage = async ({ message, userId, user }) => {
  try {
    const res = await api.post('/chat', { message, userId });
    if (res.data && res.data.message) {
      return res.data;
    }
    return computeClientFallback({ message, userId, user });
  } catch (error) {
    return computeClientFallback({ message, userId, user });
  }
};

/**
 * Client-Side AI Response Engine for Vercel Standalone Preview
 */
const computeClientFallback = ({ message, user }) => {
  const text = message.toLowerCase().trim();
  let replyText = "";
  let products = [];
  let showHumanSupport = false;

  // 1. Human support
  if (text.includes('human') || text.includes('agent') || text.includes('support') || text.includes('contact') || text.includes('phone')) {
    return {
      message: "I'm not completely sure about that. Would you like to speak with our customer support team? Our atelier concierge is available to assist you personally.",
      products: [],
      intent: 'HUMAN_SUPPORT',
      showHumanSupport: true,
      timestamp: new Date().toISOString()
    };
  }

  // 2. Order status
  if (text.includes('order') || text.includes('tracking') || text.includes('where is my') || text.includes('track')) {
    if (user) {
      const latestOrder = fallbackOrders[0];
      return {
        message: `Here is your recent order **#${latestOrder._id}**:\n\n• **Item:** ${latestOrder.items[0].name}\n• **Status:** ${latestOrder.status}\n• **Total:** ₹${latestOrder.totalAmount.toLocaleString('en-IN')}\n• **Tracking Code:** VSN-784920\n\nYour saree package is currently in transit with express air courier.`,
        products: [],
        intent: 'ORDER_STATUS',
        timestamp: new Date().toISOString()
      };
    } else {
      return {
        message: "To check your order status, please sign into your account or provide your Order ID (e.g. VSN-784920).",
        products: [],
        intent: 'ORDER_STATUS',
        timestamp: new Date().toISOString()
      };
    }
  }

  // 3. Policies
  if (text.includes('shipping') || text.includes('delivery time') || text.includes('dispatch')) {
    return { message: websitePolicies.shipping, products: [], intent: 'SHIPPING', timestamp: new Date().toISOString() };
  }
  if (text.includes('return') || text.includes('refund') || text.includes('exchange')) {
    return { message: websitePolicies.returns, products: [], intent: 'RETURN_POLICY', timestamp: new Date().toISOString() };
  }
  if (text.includes('payment') || text.includes('cod') || text.includes('upi') || text.includes('card')) {
    return { message: websitePolicies.payments, products: [], intent: 'PAYMENT', timestamp: new Date().toISOString() };
  }
  if (text.includes('silkmark') || text.includes('authentic') || text.includes('pure silk')) {
    return { message: websitePolicies.authenticity, products: [], intent: 'AUTHENTICITY', timestamp: new Date().toISOString() };
  }

  // 4. Fabric knowledge comparison
  for (const key of Object.keys(fabricKnowledge)) {
    if (text.includes(key)) {
      const info = fabricKnowledge[key];
      return {
        message: `**${info.name}**:\n\n${info.desc}`,
        products: [],
        intent: 'FABRIC_INFORMATION',
        timestamp: new Date().toISOString()
      };
    }
  }

  // 5. Product Search Extraction
  let matched = [...fallbackProducts];

  // Price match
  const underMatch = text.match(/(under|below|less than|within|around)\s*₹?\s*(\d+)/i) || text.match(/₹?\s*(\d+)\s*(under|below)/i);
  if (underMatch) {
    const maxPrice = parseInt(underMatch[1] || underMatch[2], 10);
    matched = matched.filter(p => p.price <= maxPrice);
  }

  // Category match
  if (text.includes('banarasi')) matched = matched.filter(p => p.category === 'Banarasi');
  else if (text.includes('kanjivaram') || text.includes('kanjeevaram')) matched = matched.filter(p => p.category === 'Kanjeevaram');
  else if (text.includes('chanderi')) matched = matched.filter(p => p.category === 'Chanderi');
  else if (text.includes('organza')) matched = matched.filter(p => p.category === 'Organza');
  else if (text.includes('linen')) matched = matched.filter(p => p.category === 'Linen');
  else if (text.includes('georgette')) matched = matched.filter(p => p.category === 'Georgette');
  else if (text.includes('tussar')) matched = matched.filter(p => p.category === 'Tussar Silk');
  else if (text.includes('velvet')) matched = matched.filter(p => p.category === 'Velvet');
  else if (text.includes('kerala') || text.includes('kasavu')) matched = matched.filter(p => p.category === 'Handloom Cotton' || p.name.includes('Kasavu'));

  // Color match
  if (text.includes('red') || text.includes('crimson') || text.includes('maroon')) matched = matched.filter(p => p.color.includes('Red') || p.color.includes('Maroon') || p.color.includes('Crimson'));
  else if (text.includes('green') || text.includes('emerald') || text.includes('sage')) matched = matched.filter(p => p.color.includes('Green') || p.color.includes('Emerald') || p.color.includes('Sage'));
  else if (text.includes('blue') || text.includes('midnight') || text.includes('teal')) matched = matched.filter(p => p.color.includes('Blue') || p.color.includes('Teal'));
  else if (text.includes('gold') || text.includes('mustard')) matched = matched.filter(p => p.color.includes('Gold') || p.color.includes('Mustard'));
  else if (text.includes('rose') || text.includes('pink')) matched = matched.filter(p => p.color.includes('Rose'));
  else if (text.includes('white') || text.includes('ivory')) matched = matched.filter(p => p.color.includes('White') || p.color.includes('Ivory'));

  // Occasion match
  if (text.includes('wedding') || text.includes('bridal') || text.includes('bride')) matched = matched.filter(p => p.occasion === 'Wedding' || p.occasion === 'Bridal');
  else if (text.includes('festive') || text.includes('onam') || text.includes('diwali')) matched = matched.filter(p => p.occasion === 'Festive' || p.occasion === 'Wedding');
  else if (text.includes('party')) matched = matched.filter(p => p.occasion === 'Party');
  else if (text.includes('everyday') || text.includes('office') || text.includes('casual')) matched = matched.filter(p => p.occasion === 'Everyday');

  if (matched.length > 0 && (underMatch || text.includes('silk') || text.includes('saree') || text.includes('show') || text.includes('need') || text.includes('wedding') || text.includes('banarasi') || text.includes('kanjivaram') || text.includes('organza') || text.includes('kerala'))) {
    return {
      message: `Here are exquisite saree recommendations tailored for your search:`,
      products: matched.slice(0, 4),
      intent: 'PRODUCT_SEARCH',
      timestamp: new Date().toISOString()
    };
  }

  return {
    message: "Namaste! 👋 I'm your Vasana AI saree shopping assistant. I can help you find sarees by occasion, fabric, color, or budget, answer care questions, or check order status. What are you looking for today?",
    products: [],
    intent: 'GENERAL_QUESTION',
    timestamp: new Date().toISOString()
  };
};
