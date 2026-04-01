import { useState, useEffect } from 'react';
import SafeHtml from "../common/SafeHtml";

interface VideoData {
  video: {
    title?: { en: string };
    meta_title?: { en: string };
    body?: { en: string };
    summary?: { en: string };
    image?: { url: string };
    video_url?: string;
    video_duration?: string;
    created_at?: string;
  };
}

export default function ShowVideo() {
  // Extract slug from URL pathname
  const slug = window.location.pathname.split('/').pop();
  
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(`https://adit.com/api/v1/video/${slug}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.status}`);
        }
        
        const data = await response.json();
        setVideoData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchVideo();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 text-xl font-semibold mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!videoData || !videoData.video) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">No video found</p>
      </div>
    );
  }

  const video = videoData.video;
  const title = video.title?.en || video.meta_title?.en || 'Untitled Video';
  const description = video.body?.en || video.summary?.en;
  const thumbnailUrl = video.image?.url;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {video.video_url && (
            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={video.video_url}
                loading='lazy'
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={title}
              ></iframe>
            </div>
          )}
          
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
{/*             
            {description && (
              <SafeHtml html={description} className="text-gray-700 mb-6 prose max-w-none" />
            )}
             */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 border-t pt-4">
              {video.video_duration && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{video.video_duration}</span>
                </div>
              )}
              {video.created_at && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(video.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              )}
            </div>

            {/* {thumbnailUrl && (
              <div className="mt-6">
                <img 
                  src={thumbnailUrl} 
                  alt={title}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}