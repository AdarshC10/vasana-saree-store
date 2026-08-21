import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, X, Minus, Send, Bot, User, ShoppingBag, Eye, Star, CheckCircle, HelpCircle, ArrowRight, RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage } from '../services/chatService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const initialPills = [
  'Find a Saree',
  'Wedding Sarees',
  'Kerala Sarees',
  'Silk Sarees',
  'Sarees Under ₹2000',
  'Latest Collection'
];

export default function VasanaAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  // Questionnaire Flow State
  const [wizardStep, setWizardStep] = useState(0); // 0: off, 1: occasion, 2: style, 3: budget, 4: color
  const [wizardData, setWizardData] = useState({ occasion: '', style: '', budget: '', color: '' });

  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial greeting setup
    setMessages([
      {
        id: 'welcome_1',
        sender: 'ai',
        text: "Namaste! 👋 Welcome to Vasana Sarees.\n\nI'm your personal saree shopping assistant. I can help you find the perfect saree based on your style, occasion, color, fabric, and budget.\n\nWhat are you looking for today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showPills: true
      }
    ]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
    setHasOpened(true);
  };

  const handleSendMessage = async (textToSend = null) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    if (!textToSend) setInputValue('');

    const userMsg = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await sendChatMessage({ message: text, userId: user?._id, user });
      
      setTimeout(() => {
        setIsTyping(false);
        const aiMsg = {
          id: 'ai_msg_' + Date.now(),
          sender: 'ai',
          text: response.message,
          products: response.products || [],
          intent: response.intent,
          showHumanSupport: response.showHumanSupport,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      }, 700);

    } catch (error) {
      setIsTyping(false);
      const errorMsg = {
        id: 'err_msg_' + Date.now(),
        sender: 'ai',
        text: "I'm having a little trouble connecting to the loom database right now. Please try again or browse our curated collections directly!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handlePillClick = (pill) => {
    if (pill === 'Find a Saree') {
      startWizardFlow();
    } else {
      handleSendMessage(pill);
    }
  };

  // Guided Saree Recommendation Wizard
  const startWizardFlow = () => {
    setWizardStep(1);
    const msg = {
      id: 'wiz_msg_1',
      sender: 'ai',
      text: "Let's find your dream saree! 💕 What kind of occasion are you shopping for?",
      wizardOptions: ['Wedding / Bridal', 'Festive Celebration', 'Evening Party', 'Everyday / Office'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, msg]);
  };

  const handleWizardOptionSelect = (option) => {
    if (wizardStep === 1) {
      setWizardData((prev) => ({ ...prev, occasion: option }));
      setWizardStep(2);
      const msg = {
        id: 'wiz_msg_2',
        sender: 'ai',
        text: `Wonderful! For a ${option}, what style aesthetic do you prefer?`,
        wizardOptions: ['Traditional & Regal', 'Minimal & Elegant', 'Designer & Opulent', 'Simple & Classy'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, msg]);
    } else if (wizardStep === 2) {
      setWizardData((prev) => ({ ...prev, style: option }));
      setWizardStep(3);
      const msg = {
        id: 'wiz_msg_3',
        sender: 'ai',
        text: "Got it! What budget range do you have in mind?",
        wizardOptions: ['Under ₹5,000', '₹5,000 - ₹15,000', '₹15,000 - ₹35,000', 'Above ₹35,000'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, msg]);
    } else if (wizardStep === 3) {
      const finalData = { ...wizardData, budget: option };
      setWizardStep(0);
      const query = `Show me ${finalData.style} sarees for ${finalData.occasion} ${finalData.budget}`;
      handleSendMessage(query);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1, 'Unstitched Standard');
    addToast(`Added "${product.name}" to your bag!`, 'success');
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product.slug || product._id}`);
    setIsMinimized(true);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-vasana-burgundy text-white shadow-luxury hover:shadow-luxury-hover border-2 border-vasana-gold transition-all duration-300 flex items-center space-x-3 group"
          aria-label="Open Vasana AI Chatbot"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-vasana-gold group-hover:scale-110 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-vasana-gold rounded-full border-2 border-vasana-burgundy animate-ping" />
            )}
          </div>
          <span className="font-serif text-sm tracking-wider uppercase hidden sm:inline-block font-semibold">
            Vasana AI
          </span>
        </motion.button>
      )}

      {/* Main Chat Panel Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-vasana-bg border border-vasana-gold shadow-2xl flex flex-col transition-all duration-300 overflow-hidden text-vasana-dark ${
              isMinimized ? 'h-16 w-80 sm:w-96 rounded-none' : 'h-[600px] max-h-[85vh] w-full sm:w-[420px] rounded-none'
            }`}
          >
            {/* Header */}
            <div className="bg-vasana-dark text-white p-4 border-b border-vasana-gold flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-vasana-burgundy border border-vasana-gold flex items-center justify-center text-vasana-gold relative">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-vasana-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-lg tracking-wider text-white font-medium flex items-center space-x-1.5">
                    <span>Vasana AI</span>
                    <Sparkles className="w-3.5 h-3.5 text-vasana-gold" />
                  </h3>
                  <span className="text-[10px] font-sans text-vasana-rose/80 uppercase tracking-widest block -mt-0.5">
                    Saree Shopping Assistant
                  </span>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center space-x-1 text-vasana-rose/80">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:text-vasana-gold transition-colors"
                  aria-label="Minimize Chat"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:text-vasana-gold transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Expanded Body Content */}
            {!isMinimized && (
              <>
                {/* Messages Stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-vasana-bg">
                  {messages.map((msg, idx) => (
                    <div key={msg.id || idx} className="space-y-2">
                      <div className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                          msg.sender === 'user' ? 'bg-vasana-burgundy text-white' : 'bg-vasana-dark text-vasana-gold border border-vasana-gold/50'
                        }`}>
                          {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                        </div>

                        {/* Bubble */}
                        <div className={`max-w-[82%] p-3.5 rounded-none text-xs font-sans leading-relaxed shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-vasana-burgundy text-white'
                            : 'bg-white text-vasana-dark border border-vasana-rose/50'
                        }`}>
                          <div className="whitespace-pre-line">{msg.text}</div>

                          <span className={`text-[9px] block mt-1.5 ${
                            msg.sender === 'user' ? 'text-vasana-rose/70 text-right' : 'text-gray-400'
                          }`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Quick Action Pills under Initial Greeting */}
                      {msg.showPills && (
                        <div className="flex flex-wrap gap-2 pl-9 pt-1">
                          {initialPills.map((pill) => (
                            <button
                              key={pill}
                              onClick={() => handlePillClick(pill)}
                              className="px-3 py-1.5 bg-white hover:bg-vasana-burgundy hover:text-white border border-vasana-gold/60 text-vasana-dark text-[11px] font-sans font-semibold transition-all duration-300 shadow-sm"
                            >
                              {pill}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Guided Wizard Options */}
                      {msg.wizardOptions && (
                        <div className="flex flex-wrap gap-2 pl-9 pt-1">
                          {msg.wizardOptions.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleWizardOptionSelect(opt)}
                              className="px-3.5 py-2 bg-vasana-rose/40 hover:bg-vasana-burgundy hover:text-white border border-vasana-burgundy text-vasana-burgundy text-xs font-sans font-semibold transition-all shadow-sm"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Embedded Interactive Product Cards */}
                      {msg.products && msg.products.length > 0 && (
                        <div className="pl-9 pt-2 grid grid-cols-1 gap-3">
                          {msg.products.map((prod) => (
                            <div
                              key={prod._id}
                              className="bg-white border border-vasana-rose/60 p-3 flex space-x-3 items-center shadow-sm hover:border-vasana-gold transition-all"
                            >
                              <img
                                src={prod.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80'}
                                alt={prod.name}
                                className="w-16 h-20 object-cover border border-vasana-rose/40 shrink-0"
                              />

                              <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-sans text-vasana-gold font-bold uppercase tracking-wider block">
                                  {prod.category} • {prod.fabric}
                                </span>
                                <h5 className="font-serif text-sm text-vasana-dark font-normal truncate">
                                  {prod.name}
                                </h5>

                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="font-sans font-bold text-xs text-vasana-burgundy">
                                    ₹{(prod.price * (1 - (prod.discount || 0) / 100)).toLocaleString('en-IN')}
                                  </span>
                                  {prod.discount > 0 && (
                                    <span className="text-[10px] font-sans text-gray-400 line-through">
                                      ₹{prod.price.toLocaleString('en-IN')}
                                    </span>
                                  )}
                                  <span className="text-[10px] text-amber-600 font-bold flex items-center">
                                    <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                                    {prod.rating || 4.8}
                                  </span>
                                </div>

                                <div className="flex space-x-2 mt-2">
                                  <button
                                    onClick={() => handleAddToCart(prod)}
                                    className="px-2.5 py-1 bg-vasana-burgundy text-white text-[10px] font-bold uppercase tracking-wider hover:bg-vasana-burgundyDark transition-colors flex items-center space-x-1"
                                  >
                                    <ShoppingBag className="w-3 h-3" />
                                    <span>ADD TO BAG</span>
                                  </button>

                                  <button
                                    onClick={() => handleViewProduct(prod)}
                                    className="px-2.5 py-1 border border-vasana-gold text-vasana-dark text-[10px] font-bold uppercase hover:bg-vasana-gold hover:text-white transition-colors flex items-center space-x-1"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>VIEW</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Human Support Fallback Button */}
                      {msg.showHumanSupport && (
                        <div className="pl-9 pt-2">
                          <button
                            onClick={() => { navigate('/contact'); setIsOpen(false); }}
                            className="px-4 py-2 bg-vasana-gold text-vasana-dark text-xs font-sans font-bold uppercase tracking-widest hover:bg-vasana-goldLight transition-colors flex items-center space-x-2 shadow-sm"
                          >
                            <HelpCircle className="w-4 h-4" />
                            <span>CONTACT CLIENT CONCIERGE</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center space-x-2 pl-2">
                      <div className="w-7 h-7 rounded-full bg-vasana-dark text-vasana-gold border border-vasana-gold/50 flex items-center justify-center text-xs">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div className="p-3 bg-white border border-vasana-rose/40 rounded-none flex space-x-1 items-center">
                        <div className="w-2 h-2 rounded-full bg-vasana-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-vasana-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-vasana-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Controls */}
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                  className="p-3 bg-white border-t border-vasana-rose/50 flex items-center space-x-2 shrink-0"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Vasana AI (e.g. Silk saree under 5000)..."
                    className="flex-1 bg-vasana-bg border border-gray-300 py-2 px-3 text-xs font-sans focus:outline-none focus:border-vasana-gold text-vasana-dark"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-2.5 bg-vasana-burgundy text-white disabled:opacity-40 hover:bg-vasana-burgundyDark transition-colors shrink-0"
                    aria-label="Send Message"
                  >
                    <Send className="w-4 h-4 text-vasana-gold" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
