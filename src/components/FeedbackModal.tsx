import React, { useState } from 'react';
import { FeedbackReview, MenuItem, CustomerDetails } from '../types';
import { X, Star, MessageSquare, CheckCircle2, Sparkles, Heart } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: FeedbackReview[];
  menuItems: MenuItem[];
  customer: CustomerDetails;
  onSubmitReview: (review: FeedbackReview) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  reviews,
  menuItems,
  customer,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [selectedDish, setSelectedDish] = useState<string>('General Atelier Dining');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newRev: FeedbackReview = {
      id: `rev_${Date.now()}`,
      customerName: customer.name || 'Valued Guest',
      rating,
      comment,
      dishName: selectedDish !== 'General Atelier Dining' ? selectedDish : undefined,
      timestamp: 'Just now',
      isVerifiedGuest: true,
    };

    onSubmitReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setComment('');
      onClose();
    }, 2000);
  };

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] border-2 border-[#6B1324]/20 rounded-3xl text-[#2C0B12] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#6B1324]/20 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#6B1324] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFECA7] shadow-md">
              <Star className="w-6 h-6 text-[#FFECA7] fill-[#FFECA7]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-royal font-bold text-[#6B1324] tracking-wide">
                Guest Ratings & Dining Feedback
              </h2>
              <p className="text-xs text-[#2C0B12]/70 font-serif italic">
                The Spice Atelier Reviews ({avgRating} ★ / 5.0 Rating) 👑
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#2C0B12]/60 hover:text-[#6B1324] hover:bg-[#F8F3ED] rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Submit Review Form */}
        {submitted ? (
          <div className="py-12 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-300 p-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-royal font-bold text-emerald-950">Thank You for Your Feedback!</h3>
            <p className="text-xs text-emerald-800 font-serif">
              Your valuable review helps us maintain culinary perfection at The Spice Atelier.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-[#F8F3ED] border border-[#6B1324]/20 mb-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B1324] font-royal flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Rate Your Spice Atelier Dining Experience
            </h3>

            {/* Dish selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">Select Specific Dish (Optional)</label>
                <select
                  value={selectedDish}
                  onChange={(e) => setSelectedDish(e.target.value)}
                  className="w-full bg-white border border-[#6B1324]/20 rounded-xl px-3 py-2 text-[#2C0B12] focus:outline-none focus:border-[#6B1324]"
                >
                  <option value="General Atelier Dining">General Atelier Experience</option>
                  {menuItems.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name} (₹{item.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Star Rating picker */}
              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">Your Star Rating</label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-gray-300 fill-gray-100'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#6B1324] font-royal ml-2">{rating}.0 / 5.0</span>
                </div>
              </div>
            </div>

            {/* Comment area */}
            <div>
              <label className="block text-xs text-[#2C0B12]/80 font-medium mb-1">Feedback / Review Comments</label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts on food quality, spice craftsmanship, or atmosphere..."
                className="w-full bg-white border border-[#6B1324]/20 rounded-xl p-3 text-xs text-[#2C0B12] placeholder-[#2C0B12]/40 focus:outline-none focus:border-[#6B1324]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-royal-burgundy text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Submit Guest Review</span>
            </button>
          </form>
        )}

        {/* Existing Guest Reviews List */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B1324] font-royal mb-3 flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-[#6B1324]" />
            Recent Guest Reviews
          </h3>

          <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-1">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-3.5 rounded-2xl bg-[#F8F3ED] border border-[#6B1324]/15 shadow-2xs">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="font-bold text-sm text-[#2C0B12] font-royal">{rev.customerName}</span>
                    {rev.dishName && (
                      <span className="text-[11px] text-[#2C0B12]/60 ml-2">
                        for <span className="text-[#6B1324] font-semibold">{rev.dishName}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#2C0B12]/85 italic font-serif leading-relaxed">
                  "{rev.comment}"
                </p>

                <p className="text-[10px] text-[#2C0B12]/40 mt-1 font-sans">{rev.timestamp}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
