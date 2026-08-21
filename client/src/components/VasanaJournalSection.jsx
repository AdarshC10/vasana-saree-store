import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "How to Choose the Perfect Saree for Your Body Type & Event",
    slug: "how-to-choose-the-perfect-saree",
    category: "Styling Guide",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Navigating fabric weight, drape fluidness, and pallu styles for grand weddings and intimate dinners."
  },
  {
    id: 2,
    title: "The Saree Styling Guide: Blouse Cuts & Jewellery Pairing",
    slug: "saree-styling-guide",
    category: "Haute Couture",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    excerpt: "Harmonizing temple gold, polki, and modern minimalist blouses with authentic Kanjivaram and Banarasi weaves."
  },
  {
    id: 3,
    title: "Understanding Indian Fabrics: From Mulberry Silk to Pure Linen",
    slug: "understanding-indian-fabrics",
    category: "Textile Craft",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80",
    excerpt: "A deep dive into thread count, Korvai weaving techniques, and identifying government-certified SilkMark purity."
  }
];

export default function VasanaJournalSection() {
  return (
    <section className="py-24 bg-[#F7F3ED] text-[#29231F] border-b border-[#EFE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#241C18]/10 pb-6 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-sans font-bold tracking-super-wide uppercase text-[#B4975A]">
              EDITORIAL & GUIDES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#241C18]">
              The Vasana Journal
            </h2>
          </div>

          <Link
            to="/journal"
            className="inline-flex items-center space-x-2 text-xs font-sans font-semibold tracking-widest text-[#241C18] hover:text-[#B4975A] uppercase border-b border-[#241C18] pb-1 transition-colors self-start md:self-auto"
          >
            <span>EXPLORE ALL JOURNAL ARTICLES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article key={art.id} className="bg-white border border-[#EFE7DC] shadow-luxury flex flex-col group">
              <div className="aspect-[16/10] bg-[#241C18] overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-wider text-[#B4975A] mb-1">
                    <span>{art.category}</span>
                    <span className="flex items-center text-gray-400 font-normal">
                      <Clock className="w-3 h-3 mr-1" />
                      {art.readTime}
                    </span>
                  </div>

                  <Link to={`/journal/${art.slug}`} className="font-serif text-xl text-[#241C18] hover:text-[#B4975A] transition-colors block line-clamp-2 leading-snug">
                    {art.title}
                  </Link>

                  <p className="text-xs font-sans text-gray-600 mt-2 line-clamp-3 leading-relaxed font-light">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE7DC]">
                  <Link
                    to={`/journal/${art.slug}`}
                    className="text-[11px] font-sans font-bold text-[#241C18] hover:text-[#B4975A] uppercase tracking-wider flex items-center space-x-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
