import type { Provider } from '../data';
import { type Story } from './StoryWallPage'; // Import Story type
import { useState } from 'react';

type Props = {
  provider: Provider;
  onBack: () => void;
  onChat: () => void;
  onBook: () => void;
  stories: Story[]; // New: array of all stories for displaying provider's posts
};

export default function ProviderDetailPage({ provider, onBack, onChat, onBook, stories }: Props) {
  const providerStories = stories.filter(
    (story) => story.name === provider.name || story.name === `${provider.name} (Provider)`
  ).sort((a, b) => b.timestamp - a.timestamp); // Filter and sort provider's own stories

  const [activeTab, setActiveTab] = useState<'services' | 'stories' | 'reviews'>('services');

  const tabButtonClass = (tabName: 'services' | 'stories' | 'reviews') => 
    `py-2 px-4 text-sm font-medium rounded-full transition-colors ${activeTab === tabName ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`;

  return (
    <div className="p-4 pt-6">
      <button onClick={onBack} className="mb-4 text-gray-500 hover:text-gray-800 transition-colors flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Providers
      </button>
      
      <div className="flex items-center mb-4">
        <img src={provider.avatar} className="rounded-full mr-4 shadow-md" width={80} height={80} alt={provider.name} />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{provider.name} ({provider.service})</h2>
          <div className="flex items-center text-yellow-500 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-gray-600 font-semibold">{provider.rating}</span>
            <span className="ml-2 text-gray-400 text-sm">({provider.reviews} Reviews)</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onChat}
        className="w-full py-3 mb-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        Chat with {provider.name}
      </button>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">Identity Verified</span>
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Background Check Passed</span>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">5 Years Experience</span>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-around border-b border-gray-200 mb-6">
        <button onClick={() => setActiveTab('services')} className={tabButtonClass('services')}>Service Details</button>
        <button onClick={() => setActiveTab('stories')} className={tabButtonClass('stories')}>Stories ({providerStories.length})</button>
        <button onClick={() => setActiveTab('reviews')} className={tabButtonClass('reviews')}>Reviews ({provider.clientReviews?.length || 0})</button>
      </div>

      {activeTab === 'services' && (
        <>
          <p className="text-gray-600 mb-6">{provider.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-3">Service Details</h3>
            <img src="https://placehold.co/400x200/f1f5f9/4f46e5?text=Service+Description" className="rounded-lg w-full mb-3" alt="Service Description" />
            <ul className="list-disc pl-6 text-gray-600">
              <li>Kitchen degreasing, wiping down appliances</li>
              <li>Vacuuming and mopping bedrooms and living room</li>
              <li>Bathroom sanitization, organizing toiletries</li>
            </ul>
          </div>
        </>
      )}

      {activeTab === 'stories' && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">{provider.name}'s Stories</h3>
          <div className="space-y-4">
            {providerStories.length === 0 ? (
              <div className="text-gray-500">No stories posted by {provider.name} yet.</div>
            ) : (
              providerStories.map((s) => (
                <div
                  key={s.id}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center mb-3">
                    <img
                      src={s.avatar}
                      className="rounded-full mr-3"
                      width={40} height={40}
                      alt={s.name}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{s.name}</h4>
                      <p className="text-xs text-gray-500">
                        {s.title} • {new Date(s.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    {s.type === 'provider' && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium ml-auto px-2 py-1 rounded-full">
                        Provider
                      </span>
                    )}
                    {s.badge && s.type === 'consumer' && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium ml-auto px-2 py-1 rounded-full">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">
                    {s.content}
                  </p>
                  {s.image && (
                    <img
                      src={s.image}
                      className="rounded-lg w-full mb-3"
                      alt="Story image"
                    />
                  )}
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="flex items-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      {s.likes}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      {s.comments}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Client Reviews ({provider.clientReviews?.length || 0})</h3>
          <div className="space-y-4">
            {provider.clientReviews?.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-2">
                  <p className="font-semibold text-gray-800 mr-2">{review.reviewerName}</p>
                  <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill={i < review.rating ? "currentColor" : "none"}
                        stroke={i < review.rating ? "none" : "currentColor"}
                        strokeWidth="1"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 ml-auto">{new Date(review.timestamp).toLocaleDateString()}</p>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <button 
          onClick={onBook}
          className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          Book Now
        </button>
      )}
    </div>
  );
}
