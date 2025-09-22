import { useState } from "react";
import PostYourStory from "../pages/PostYourStory";
import StoryForm from "../pages/StoryForm";
import { servicesData } from '../data'; // Import servicesData

export type Story = {
  id: number;
  name: string;
  title: string;
  content: string;
  type: 'consumer' | 'provider'; // New: type of user who posted
  avatar: string; // New: avatar image URL
  serviceCategory?: string; // New: optional service category for filtering
  timestamp: number; // New: for sorting by time
  image?: string; // New: optional image for the story
  badge?: string; // New: optional badge like 'First-Timer'
  likes?: number; // New: for future engagement
  comments?: number; // New: for future engagement
};

type Props = {
  loggedInUserName: string;
  stories: Story[]; // New: array of all stories
  addStory: (story: Omit<Story, "id" | "timestamp" | "avatar" | "likes" | "comments"> & { type: 'consumer' | 'provider'; serviceCategory?: string; image?: string; badge?: string; }) => void; // New: function to add a story
};

export default function StoryWallPage({ loggedInUserName, stories, addStory }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filterType, setFilterType] = useState<'all' | 'consumer' | 'provider'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredStories = stories.filter(story => {
    const typeMatch = filterType === 'all' || story.type === filterType;
    const categoryMatch = filterCategory === 'all' || story.serviceCategory === filterCategory;
    return typeMatch && categoryMatch;
  }).sort((a, b) => b.timestamp - a.timestamp); // Sort by latest first

  return (
    <div className="p-4 pt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Community Stories</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Post Your Story
        </button>
      </div>

      {/* Gamified Prompt (Placeholder) */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6 text-sm text-yellow-800">
        <p className="font-semibold mb-1">What did you accomplish with your newfound time?</p>
        <p>Share your latest success story and inspire others!</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <select 
          value={filterType} 
          onChange={e => setFilterType(e.target.value as 'all' | 'consumer' | 'provider')}
          className="w-full sm:w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Posts</option>
          <option value="consumer">Consumer Posts</option>
          <option value="provider">Provider Posts</option>
        </select>
        <select 
          value={filterCategory} 
          onChange={e => setFilterCategory(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Categories</option>
          {Object.values(servicesData).map(service => (
            <option key={service.id} value={service.id}>{service.name}</option>
          ))}
        </select>
      </div>

      {/* Modal with form */}
      <PostYourStory isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Share Your Story</h3>
        <StoryForm 
          onSubmit={(storyData) => addStory({ ...storyData, type: storyData.type === 'consumer' ? 'consumer' : 'provider' })}
          onClose={() => setIsModalOpen(false)}
          loggedInUserName={loggedInUserName}
        />
      </PostYourStory>

      {/* Stats Box */}
      <div className="bg-gray-100 p-4 rounded-xl mb-4 text-center border-l-4 border-indigo-500">
        <p className="text-gray-800 font-medium">
          <span className="text-indigo-600 font-bold">80%</span> of families in
          your area use home cleaning services!
        </p>
      </div>

      {/* Trending Stories (Editor's Picks Placeholder) */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Trending Stories</h2>
      <div className="space-y-4 mb-6">
        {filteredStories.slice(0, 2).map((s) => (
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
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Stories</h2>
      {/* Story List */}
      <div className="space-y-4">
        {filteredStories.length === 0 && (
          <div className="text-center text-gray-500 mt-10 text-lg">No stories match your filters.</div>
        )}
        {filteredStories.map((s) => (
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
        ))}
      </div>
    </div>
  );
}
