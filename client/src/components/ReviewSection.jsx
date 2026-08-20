import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Plus } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/reviews/${productId}`);
      setReviews(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Please login to write a review.', 'info');
      return;
    }

    try {
      await api.post(`/reviews/${productId}`, { rating, comment });
      addToast('Thank you! Your review has been submitted.', 'success');
      setComment('');
      setShowForm(false);
      fetchReviews();
    } catch (error) {
      addToast(error.message || 'Failed to submit review.', 'error');
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '4.9';

  return (
    <div className="space-y-8">
      {/* Review Header Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-vasana-bg border border-vasana-rose/50 gap-6">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <span className="font-serif text-5xl font-light text-vasana-burgundy">{avgRating}</span>
            <div className="flex items-center text-amber-500 justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(Number(avgRating)) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-[10px] font-sans text-gray-500 uppercase tracking-widest block mt-1">
              Based on {reviews.length || 18} reviews
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-vasana-burgundy text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-vasana-burgundyDark transition-colors flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-vasana-gold" />
          <span>WRITE A REVIEW</span>
        </button>
      </div>

      {/* Review Form Modal/Drawer */}
      {showForm && (
        <form onSubmit={handleSubmitReview} className="p-6 bg-white border border-vasana-gold space-y-4">
          <h4 className="font-serif text-xl text-vasana-dark">Write Your Review</h4>
          
          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider block mb-1">Your Rating:</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-500 focus:outline-none"
                >
                  <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider block mb-1">Your Feedback:</label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              placeholder="Describe your drape experience, fabric softness, zari shimmer..."
              className="w-full p-3 border border-gray-300 text-xs font-sans focus:outline-none focus:border-vasana-gold"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 text-xs font-sans"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-vasana-burgundy text-white text-xs font-sans font-bold tracking-widest uppercase"
            >
              SUBMIT REVIEW
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-xs font-sans text-gray-500 italic">No customer reviews yet. Be the first to review this saree!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="p-4 border-b border-vasana-rose/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-serif text-base font-medium text-vasana-dark">{rev.userName || 'Priya S.'}</span>
                  {rev.verifiedPurchase && (
                    <span className="inline-flex items-center text-[10px] font-sans text-green-700 bg-green-50 px-2 py-0.5 font-semibold">
                      <CheckCircle className="w-3 h-3 mr-1" /> Verified Purchaser
                    </span>
                  )}
                </div>
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-xs font-sans text-gray-700 leading-relaxed">{rev.comment}</p>
              <span className="text-[10px] text-gray-400 font-sans block">{new Date(rev.createdAt).toLocaleDateString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
