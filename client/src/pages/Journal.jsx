import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import api from '../services/api';
import { fallbackBlogs } from '../utils/fallbackData';

const categories = ['All', 'Style Guide', 'Craft & Culture', 'Saree Care', 'Weddings & Festive', 'Trends'];

export default function Journal() {
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const url = selectedCategory !== 'All' ? `/blogs?category=${encodeURIComponent(selectedCategory)}` : '/blogs';
      const res = await api.get(url);
      if (res.data?.length) setBlogs(res.data);
      else filterFallback();
    } catch (error) {
      filterFallback();
    } finally {
      setLoading(false);
    }
  };

  const filterFallback = () => {
    if (selectedCategory === 'All') {
      setBlogs(fallbackBlogs);
    } else {
      setBlogs(fallbackBlogs.filter(b => b.category === selectedCategory));
    }
  };

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold">
            VASANA EDITORIAL
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-vasana-dark mt-1">
            Fashion Journal & Style Guides
          </h1>
          <p className="text-xs font-sans text-gray-500 mt-2">
            Stories on weaving heritage, saree drape tutorials, and wedding style guides.
          </p>
          <div className="w-12 h-[2px] bg-vasana-gold mx-auto mt-4" />
        </div>

        {/* Category Pills */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-sans tracking-wider uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-vasana-burgundy text-white font-bold'
                  : 'bg-white border border-vasana-rose text-vasana-dark hover:border-vasana-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog._id} className="bg-white border border-vasana-rose/50 shadow-sm flex flex-col group">
              <div className="aspect-[16/10] overflow-hidden bg-vasana-dark">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-sans text-vasana-gold font-bold uppercase tracking-wider mb-1">
                    <span>{blog.category}</span>
                    <span className="flex items-center text-gray-400 font-normal">
                      <Clock className="w-3 h-3 mr-1" />
                      {blog.readTime || '4 min read'}
                    </span>
                  </div>

                  <Link to={`/journal/${blog.slug}`} className="font-serif text-xl text-vasana-dark hover:text-vasana-burgundy transition-colors block line-clamp-2">
                    {blog.title}
                  </Link>

                  <p className="text-xs font-sans text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-vasana-rose/30 flex items-center justify-between">
                  <span className="text-[10px] font-sans text-gray-400">{blog.author || 'VASANA Studio'}</span>
                  <Link
                    to={`/journal/${blog.slug}`}
                    className="text-xs font-sans font-bold text-vasana-burgundy hover:text-vasana-gold flex items-center space-x-1 uppercase tracking-wider"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
