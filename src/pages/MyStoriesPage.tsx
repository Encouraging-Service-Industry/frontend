import type { Story } from './StoryWallPage'; // Import the Story type

type Props = {
  onBack: () => void;
  loggedInUserName: string;
  userStories: Story[]; // Array of stories posted by the user
};

export default function MyStoriesPage({ onBack, loggedInUserName, userStories }: Props) {
  const base = userStories.filter(story => story.name === loggedInUserName || story.name === `${loggedInUserName} (Provider)`) 
                         .sort((a, b) => b.timestamp - a.timestamp);
  const demoPosts = base.length > 0 ? [] : [
    {
      id: Date.now() + 1,
      name: loggedInUserName,
      title: "I outsourced cleaning and got my Sunday forest walk back!",
      content: "Booked a deep clean this week. Spent the morning in Nuuksio with the kids. Zero guilt—100% joy.",
      type: "consumer",
      avatar: "/assets/Anna.jpg",
      serviceCategory: "home_cleaning",
      timestamp: Date.now() - 3600000 * 6,
      image: "/assets/gardening.jpg",
      badge: "First-Timer",
      likes: 12,
      comments: 3,
    },
    {
      id: Date.now() + 2,
      name: loggedInUserName,
      title: "Errands outsourced → extra time for a long sauna evening",
      content: "Tried an errands helper for the first time. More time for family dinner and sauna. Feels great!",
      type: "consumer",
      avatar: "/assets/Anna.jpg",
      serviceCategory: "errands",
      timestamp: Date.now() - 3600000 * 24,
      image: "/assets/errand.jpg",
      badge: "Weekend Saver",
      likes: 9,
      comments: 1,
    },
  ] as any;
  const myStories = [...demoPosts, ...base];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900">← Back</button>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow">Write a Story</button>
      </div>

      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 shadow mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-900">My Stories</h1>
        <p className="text-gray-700 mt-1">Celebrate what you’ve unlocked by asking for help.</p>
      </div>

      {myStories.length === 0 && (
        <div className="text-center text-gray-500 mt-10 text-lg">
          You haven't posted any stories yet. <br/> Share your first accomplishment!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myStories.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            {s.image && (
              <img src={s.image} alt="Story" className="h-40 w-full object-cover" />
            )}
            <div className="p-4">
              <div className="flex items-center mb-3">
                <img src={s.avatar} className="rounded-full mr-3 w-8 h-8 object-cover" alt={s.name} />
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">{s.title}</h4>
                  <p className="text-xs text-gray-500 truncate">{s.name} • {new Date(s.timestamp).toLocaleDateString()}</p>
                </div>
                {s.badge && (
                  <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">{s.badge}</span>
                )}
              </div>
              <p className="text-gray-700 text-sm mb-3">{s.content}</p>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>{s.likes}</span>
                <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>{s.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
