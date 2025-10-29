import { useState } from "react";
import { servicesData } from '../data';

type StoryFormProps = {
  onSubmit: (
    story: {
      name: string;
      title: string;
      content: string;
      type: 'consumer' | 'provider'; // New: user type
      serviceCategory?: string; // New: optional service category
      image?: string; // New: optional image URL
    }
  ) => void;
  onClose: () => void;
  loggedInUserName: string; // New: logged-in user's name
};

export default function StoryForm({ onSubmit, onClose, loggedInUserName }: StoryFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<'consumer' | 'provider'>('consumer'); // Always consumer
  const [serviceCategory, setServiceCategory] = useState<string>("");
  const [image, setImage] = useState<string>(""); // New: state for image URL

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storyName = loggedInUserName; // Always consumer
    onSubmit({ name: storyName, title, content, type: 'consumer', serviceCategory: serviceCategory || undefined, image: image || undefined });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {type === 'provider' && (
        <div>
          <label htmlFor="service-category" className="block text-base font-medium text-gray-700 mb-1">
            Service Category:
          </label>
          <div>
            <select
              id="service-category"
              value={serviceCategory}
              onChange={(e) => setServiceCategory(e.target.value)}
              className="block w-full px-3 py-2.5 text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              required
            >
              <option value="">Select a category</option>
              {Object.values(servicesData).map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div>
        <label htmlFor="story-title" className="block text-base font-medium text-gray-700 mb-1">
          Story Title:
        </label>
        <div>
          <input
            id="story-title"
            type="text"
            placeholder="Enter your story title"
            className="appearance-none block w-full px-3 py-2.5 text-base border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="story-content" className="block text-base font-medium text-gray-700 mb-1">
          Story Content:
        </label>
        <div>
          <textarea
            id="story-content"
            placeholder="Write your story content here..."
            className="appearance-none block w-full px-3 py-2.5 text-base border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-y h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="image-url" className="block text-base font-medium text-gray-700 mb-1">
          Image URL (optional):
        </label>
        <div>
          <input
            id="image-url"
            type="text"
            placeholder="e.g., https://example.com/image.jpg"
            className="appearance-none block w-full px-3 py-2.5 text-base border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
        >
          Post
        </button>
      </div>
    </form>
  );
}
