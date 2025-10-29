import { useState } from "react";
import PostYourStory from "../pages/PostYourStory";
import StoryForm from "../pages/StoryForm";
import { servicesData } from "../data"; // Import servicesData
import StoryCard from "../components/StoryCard";

import { type Story } from "../types/story"; // Import Story type from dedicated types file

type Props = {
  loggedInUserName: string;
  stories: Story[]; // New: array of all stories
  addStory: (
    story: Omit<Story, "id" | "timestamp" | "avatar" | "likes" | "comments"> & {
      type: "consumer" | "provider";
      serviceCategory?: string;
      image?: string;
      badge?: string;
    }
  ) => void; // New: function to add a story
};

export default function StoryWallPage({
  loggedInUserName,
  stories,
  addStory,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filterType, setFilterType] = useState<"all" | "consumer" | "provider">(
    "all"
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredStories = stories
    .filter((story) => {
      const typeMatch = filterType === "all" || story.type === filterType;
      const categoryMatch =
        filterCategory === "all" || story.serviceCategory === filterCategory;
      return typeMatch && categoryMatch;
    })
    .sort((a, b) => b.timestamp - a.timestamp); // Sort by latest first

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="space-y-8">
        {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Community Stories
        </h1>
        <p className="text-xl text-gray-600 mx-auto mb-8">
          Read inspiring stories from our community and share your own
          experiences.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary px-8 py-3 text-lg font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 inline"
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
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6 text-sm text-yellow-800 mx-auto">
        <p className="font-semibold mb-1">
          What did you accomplish with your newfound time?
        </p>
        <p>Share your latest success story and inspire others!</p>
      </div>

      {/* Filter Bar */}
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as "all" | "consumer" | "provider")
            }
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          >
            <option value="all">All Posts</option>
            <option value="consumer">Consumer Posts</option>
            <option value="provider">Provider Posts</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          >
            <option value="all">All Categories</option>
            {Object.values(servicesData).map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modal with form */}
      <PostYourStory isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Share Your Story</h3>
        <StoryForm
          onSubmit={(storyData) =>
            addStory({
              ...storyData,
              type: storyData.type === "consumer" ? "consumer" : "provider",
            })
          }
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

      {/* Stories Grid */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Community Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredStories.map((s) => (
            <StoryCard key={s.id} story={s} />
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center text-gray-500 text-xl py-12">
            No stories match the current filters.
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
