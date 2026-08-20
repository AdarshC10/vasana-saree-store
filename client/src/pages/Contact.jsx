import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, HelpCircle, ChevronDown } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const faqs = [
  {
    q: 'How do I care for my pure Kanjivaram silk saree?',
    a: 'We recommend dry cleaning only. Wrap your silk saree in soft unbleached cotton muslin cloth and refold every 3-4 months.'
  },
  {
    q: 'Are your sarees certified authentic silk?',
    a: 'Yes, every pure silk saree from VASANA comes with an authentic government SilkMark purity tag.'
  },
  {
    q: 'What is your shipping & return policy?',
    a: 'We offer complimentary express shipping across India. Unworn sarees with original tags can be returned within 7 days.'
  },
  {
    q: 'Do you offer blouse tailoring services?',
    a: 'Yes! You can choose custom tailored blouse stitching on the product page or request unstitched standard fabric.'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Thank you! Your inquiry has been sent to VASANA Customer Care.', 'success');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold">
            CLIENT CARE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-vasana-dark mt-1">
            Contact VASANA Concierge
          </h1>
          <p className="text-xs font-sans text-gray-500 mt-2">
            We are here to assist with custom styling, bridal trousseau orders, and order inquiries.
          </p>
          <div className="w-12 h-[2px] bg-vasana-gold mx-auto mt-4" />
        </div>

        {/* Form & Info Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-vasana-rose/50 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl text-vasana-dark border-b border-vasana-rose pb-3">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold uppercase mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Bridal Consultation / Order Status..."
                    className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold uppercase mb-1">Message *</label>
                <textarea
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How may our concierge assist you?"
                  className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-vasana-burgundy hover:bg-vasana-burgundyDark text-white text-xs font-sans font-bold tracking-super-wide uppercase shadow-luxury transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4 text-vasana-gold" />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          </div>

          {/* Concierge Info */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-vasana-rose/50 shadow-sm space-y-6 text-xs font-sans text-vasana-dark">
            <h3 className="font-serif text-2xl text-vasana-dark border-b border-vasana-rose pb-3">
              Concierge Details
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-vasana-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-serif text-base">Flagship Atelier</strong>
                  <p className="text-gray-600">108 Fashion Avenue, Jubilee Hills, Hyderabad, Telangana 500033, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-vasana-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-serif text-base">Email Us</strong>
                  <p className="text-gray-600">concierge@vasana.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-vasana-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-serif text-base">Phone Helpline</strong>
                  <p className="text-gray-600">+91 (040) 8877-6655 / +91 9876543210</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-vasana-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-serif text-base">Atelier Hours</strong>
                  <p className="text-gray-600">Monday – Saturday: 10:00 AM – 7:30 PM IST</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="bg-white p-6 sm:p-10 border border-vasana-rose/50 shadow-sm space-y-6">
          <div className="text-center">
            <h3 className="font-serif text-3xl font-light text-vasana-dark">Frequently Asked Questions</h3>
            <div className="w-12 h-[2px] bg-vasana-gold mx-auto mt-2" />
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-vasana-rose/40">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 font-serif text-lg font-light text-vasana-dark flex items-center justify-between hover:text-vasana-burgundy"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-vasana-gold' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs font-sans text-gray-600 leading-relaxed border-t border-vasana-rose/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
