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
  const [type, setType] = useState<'consumer' | 'provider'>('consumer'); // Default to consumer
  const [serviceCategory, setServiceCategory] = useState<string>("");
  const [image, setImage] = useState<string>(""); // New: state for image URL

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: loggedInUserName, title, content, type, serviceCategory: serviceCategory || undefined, image: image || undefined });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select 
        value={type}
        onChange={(e) => setType(e.target.value as 'consumer' | 'provider')}
        className="w-full border rounded-lg p-2 bg-white"
      >
        <option value="consumer">I am a Consumer</option>
        <option value="provider">I am a Service Provider</option>
      </select>
      {type === 'provider' && (
        <select 
          value={serviceCategory}
          onChange={(e) => setServiceCategory(e.target.value)}
          className="w-full border rounded-lg p-2 bg-white"
          required
        >
          <option value="">Select Service Category</option>
          {Object.values(servicesData).map(service => (
            <option key={service.id} value={service.id}>{service.name}</option>
          ))}
        </select>
      )}
      <input
        type="text"
        placeholder="Story Title"
        className="w-full border rounded-lg p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your story..."
        className="w-full border rounded-lg p-2 h-32"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        className="w-full border rounded-lg p-2"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Post
        </button>
      </div>
    </form>
  );
}
