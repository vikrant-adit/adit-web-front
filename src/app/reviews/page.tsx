'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import SiteLayout from "@/components/layout/SiteLayout";

interface Review {
  id: number;
  client_name: string;
  review_description: string;
  rating: string;
  date_added: string;
  source: string;
  created_at: string;
  updated_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://adit.com/api/v1/reviews')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        return response.json();
      })
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  // ✅ Pre-generate static star keys (for rating cards)
  const staticStarKeys = useMemo(
    () => Array.from({ length: 5 }, (_, i) => `static-star-${i}`),
    []
  );

  // ✅ Extracted rendering logic (fix for nested ternary)
  let content;

  if (loading) {
    content = (
      <div className="text-center text-gray-600">
        Loading reviews...
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-center text-red-600">
        Error loading reviews: {error}
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="relative bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8">
              <svg
                className="w-16 h-16 text-orange-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>
            </div>

            <div className="mt-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {review.client_name}
                </h3>
                <span className="text-sm text-gray-500">
                  {formatDate(review.date_added)}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {review.review_description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-sm transform rotate-45"></div>
                  <span className="text-lg font-bold text-blue-600">
                    {review.source}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: Number.parseInt(review.rating) },
                    (_, i) => (
                      <Star
                        key={`star-${review.id}-${i}`}
                        className="w-5 h-5 fill-orange-500 text-orange-500"
                      />
                    )
                  )}
                  <span className="ml-2 font-bold text-gray-900">
                    {review.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Speech Bubble Tail */}
            <div className="absolute -bottom-4 left-12 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-white"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <SiteLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row">
          <div className="bg-blue-50 lg:w-2/5 p-12 flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Reviews</h1>
            <div className="w-24 h-1 bg-orange-500 mb-6"></div>
            <p className="text-gray-700 text-lg">What Our Doctors Have To Say</p>
          </div>

          <div className="bg-slate-800 lg:w-3/5 p-12 flex flex-col justify-center">
            <div className="flex flex-wrap gap-4 mb-12 justify-center lg:justify-end">
              
              {/* Capterra */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-sm transform rotate-45"></div>
                  <span className="text-2xl font-bold text-gray-800">Capterra</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-800">4.9</span>
                  <div className="flex">
                    {staticStarKeys.map((key) => (
                      <Star key={key} className="w-5 h-5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Software Advice */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-gray-800">Software Advice</span>
                  <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-800">4.8</span>
                  <div className="flex">
                    {staticStarKeys.map((key) => (
                      <Star key={key} className="w-5 h-5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-orange-500">1,000+</span>
                  <CheckCircle className="w-10 h-10 text-blue-400" />
                </div>
                <p className="text-white text-xl font-semibold">Satisfied Customers</p>
              </div>

              <div className="flex flex-col items-center border-l border-r border-gray-600 px-4">
                <div className="mb-2">
                  <span className="text-orange-500 text-3xl font-semibold">Save</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-orange-500">15hrs</span>
                    <span className="text-2xl text-orange-500">/Week</span>
                  </div>
                </div>
                <p className="text-white text-xl font-semibold">On Average</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-orange-500 mb-2">#1</div>
                <p className="text-white text-xl font-semibold">Customer Service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {content}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Reviews;