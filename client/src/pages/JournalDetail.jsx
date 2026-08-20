import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { fallbackBlogs } from '../utils/fallbackData';

export default function JournalDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/blogs/${slug}`);
      if (res.data) setBlog(res.data);
      else findFallback();
    } catch (error) {
      findFallback();
    } finally {
      setLoading(false);
    }
  };

  const findFallback = () => {
    const found = fallbackBlogs.find(b => b.slug === slug || b._id === slug) || fallbackBlogs[0];
    setBlog(found);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-vasana-bg pt-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-vasana-gold" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-vasana-bg pt-32 text-center p-8">
        <h2 className="font-serif text-3xl text-vasana-dark">Article Not Found</h2>
        <Link to="/journal" className="mt-4 inline-block text-vasana-gold underline">Return to Journal</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link to="/journal" className="inline-flex items-center text-xs font-sans text-vasana-burgundy hover:underline uppercase tracking-wider font-bold">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Journal
        </Link>

        {/* Article Header */}
        <div className="space-y-4 text-center sm:text-left">
          <span className="text-xs font-sans text-vasana-gold font-bold uppercase tracking-super-wide">
            {blog.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-vasana-dark leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center space-x-4 text-xs font-sans text-gray-500 pt-2 border-b border-vasana-rose pb-4">
            <span>By {blog.author}</span>
            <span>•</span>
            <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" />{blog.readTime}</span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="aspect-[16/9] overflow-hidden bg-vasana-dark border border-vasana-rose/50">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div
          className="prose prose-serif max-w-none text-sm font-sans text-gray-800 leading-relaxed space-y-4 bg-white p-6 sm:p-10 border border-vasana-rose/40"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="pt-8 text-center">
          <Link
            to="/shop"
            className="inline-block px-8 py-3.5 bg-vasana-burgundy text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-vasana-burgundyDark transition-colors"
          >
            SHOP FEATURED SAREES
          </Link>
        </div>

      </div>
    </div>
  );
}
