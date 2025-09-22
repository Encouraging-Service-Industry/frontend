import type { Story } from './StoryWallPage'; // Import the Story type

type Props = {
  onBack: () => void;
  loggedInUserName: string;
  userStories: Story[]; // Array of stories posted by the user
};

export default function MyStoriesPage({ onBack, loggedInUserName, userStories }: Props) {
  const myStories = userStories.filter(story => story.name === loggedInUserName || story.name === `${loggedInUserName} (Provider)`)
                               .sort((a, b) => b.timestamp - a.timestamp); // Sort by latest first

  return (
    <div className="p-4 pt-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">My Stories</h1>

      <div className="space-y-4">
        {myStories.length === 0 && (
          <div className="text-center text-gray-500 mt-10 text-lg">
            You haven't posted any stories yet. <br/> Share your first accomplishment!
          </div>
        )}
        {myStories.map((s) => (
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
