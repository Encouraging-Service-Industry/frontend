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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Community Stories
        </h1>
        <p className="text-lg text-gray-600 mx-auto mb-8">
          Read inspiring stories from our community and share your own
          experiences.
        </p>

        {/* Gamified Prompt (Placeholder) */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6 text-sm text-yellow-800 mx-auto">
          <p className="font-semibold mb-1">
            What did you accomplish with your newfound time?
          </p>
          <p>Share your latest success story and inspire others!</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-xl hover:bg-indigo-700 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Post Your Story
        </button>
      </div>

      {/* Filter Bar */}
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex rounded-lg bg-gray-100 p-1 space-x-1">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterType === "all" ? "bg-white shadow text-indigo-700" : "text-gray-600 hover:bg-gray-200"}`}
            >
              All Posts
            </button>
            <button
              onClick={() => setFilterType("consumer")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterType === "consumer" ? "bg-white shadow text-indigo-700" : "text-gray-600 hover:bg-gray-200"}`}
            >
              Consumer Posts
            </button>
            <button
              onClick={() => setFilterType("provider")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterType === "provider" ? "bg-white shadow text-indigo-700" : "text-gray-600 hover:bg-gray-200"}`}
            >
              Provider Posts
            </button>
          </div>
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
      </div>
      </div>
    </div>
  );
}
