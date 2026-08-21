import { detectIntent, searchProductsInDB } from '../services/aiChatService.js';
import Order from '../models/Order.js';

export const processChatMessage = async (req, res, next) => {
  try {
    const { message, userId, context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'Please provide a valid message string' });
    }

    const intentData = detectIntent(message);
    let replyText = "";
    let products = [];
    let showHumanSupport = false;

    switch (intentData.intent) {
      case 'HUMAN_SUPPORT':
        replyText = "I'm not completely sure about that. Would you like to speak with our customer support team? Our atelier concierge is available to assist you personally.";
        showHumanSupport = true;
        break;

      case 'ORDER_STATUS':
        if (req.user || userId) {
          const userOrders = await Order.find({ user: req.user?._id || userId }).sort({ createdAt: -1 }).limit(2);
          if (userOrders.length > 0) {
            const latest = userOrders[0];
            replyText = `Here is your recent order **#${latest._id}**:\n\n• **Status:** ${latest.status}\n• **Total:** ₹${latest.totalAmount?.toLocaleString('en-IN')}\n• **Tracking Code:** ${latest.trackingCode || 'VSN-784920'}\n\nYour package is currently in transit with express air courier.`;
          } else {
            replyText = "I checked your account, but couldn't find any recent orders placed yet. If you have an order ID, please share it and I will look it up!";
          }
        } else {
          replyText = "To check your order status, please sign into your account or provide your Order ID (e.g. VSN-784920).";
        }
        break;

      case 'SHIPPING':
      case 'RETURN_POLICY':
      case 'PAYMENT':
      case 'AUTHENTICITY':
        replyText = intentData.answer;
        break;

      case 'FABRIC_INFORMATION':
        if (intentData.info) {
          replyText = `**${intentData.info.name}**:\n\n${intentData.info.desc}`;
        } else {
          replyText = "We specialize in authentic handloom fabrics including Kanchipuram Silk, Banarasi Katan, Tissue Organza, Chanderi, Viscose Georgette, Wild Tussar, and Pure Linen. Which fabric would you like to compare?";
        }
        break;

      case 'PRODUCT_SEARCH':
        products = await searchProductsInDB(intentData.filters);
        if (products.length > 0) {
          const filterSummary = Object.entries(intentData.filters)
            .filter(([_, v]) => v)
            .map(([k, v]) => `${k}: ${v}`)
            .join(', ');
          replyText = `Here are exquisite saree selections for you${filterSummary ? ` (${filterSummary})` : ''}:`;
        } else {
          replyText = "I couldn't find any sarees matching those exact criteria in our current loom collection. Would you like to explore our broader Wedding or Festive collection?";
        }
        break;

      default:
        replyText = "Namaste! 👋 I'm your personal Vasana saree assistant. I can help you find sarees by occasion, fabric, color, or budget, answer care questions, or check order status. What are you looking for today?";
        break;
    }

    res.json({
      message: replyText,
      products,
      intent: intentData.intent,
      showHumanSupport,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    next(error);
  }
};
