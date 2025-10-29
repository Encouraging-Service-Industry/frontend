import React from 'react';
import { type Story } from '../types/story'; // Import Story type from dedicated types file

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story: s }) => {
  return (
    <div
      key={s.id}
      className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white flex flex-col justify-between h-full"
    >
      {/* Header: Avatar, Name, Date, Badges */}
      <div className="flex items-start mb-4 h-16 flex-shrink-0">
        <img
          src={s.avatar}
          className="rounded-full mr-3 w-12 h-12 object-cover flex-shrink-0"
          alt={s.name}
        />
        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          <h4 className="font-bold text-gray-800 line-clamp-1">{s.name}</h4>
          <p className="text-sm text-gray-500">
            {new Date(s.timestamp).toLocaleDateString()}
          </p>
        </div>
        <div className="flex-shrink-0 ml-auto flex items-center space-x-2">
          {s.type === "provider" && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              Provider
            </span>
          )}
          {s.badge && s.type === "consumer" && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              {s.badge}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-800 mb-3 text-lg flex-shrink-0">
        {s.title}
      </h3>

      {/* Content */}
      <p className="text-gray-600 mb-4 line-clamp-3 overflow-hidden flex-shrink-0" style={{ minHeight: '4.5em' }}>{s.content}</p>

      {/* Optional Image Area with Placeholder */}
      <div className="w-full mb-4 flex-shrink-0" style={{ height: '12rem' }}> {/* Fixed height for image area (e.g., 192px) */}
        {s.image ? (
          <img
            src={s.image}
            className="rounded-lg w-full h-full object-cover"
            alt="Story image"
          />
        ) : (
          <div className="rounded-lg w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Footer: Likes & Comments */}
      <div className="flex items-center text-gray-500 text-sm flex-shrink-0">
        <span className="flex items-center mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {s.likes || 0}
        </span>
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0 4.418 4.03 8 9 8s9 3.582 9 8z"
            />
          </svg>
          {s.comments || 0}
        </span>
      </div>
    </div>
  );
};

export default StoryCard;
