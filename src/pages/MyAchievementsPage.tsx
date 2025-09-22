type Props = {
  onBack: () => void;
};

export default function MyAchievementsPage({ onBack }: Props) {
  // Mock data for achievements
  const achievements = [
    {
      id: 'badge-1',
      name: 'First-Timer',
      description: 'Completed your first outsourced service!',
      icon: '⭐',
      unlocked: true,
      progress: 1,
      total: 1,
    },
    {
      id: 'badge-2',
      name: 'Service Seeker',
      description: 'Completed 5 outsourced services.',
      icon: '🏅',
      unlocked: true,
      progress: 5,
      total: 5,
    },
    {
      id: 'badge-3',
      name: 'Time Saver Pro',
      description: 'Saved 10+ hours by outsourcing tasks.',
      icon: '⏰',
      unlocked: false,
      progress: 8,
      total: 10,
    },
    {
      id: 'badge-4',
      name: 'Community Contributor',
      description: 'Posted 3 stories on the Story Wall.',
      icon: '💬',
      unlocked: true,
      progress: 3,
      total: 3,
    },
    {
      id: 'badge-5',
      name: 'Eco-Warrior',
      description: 'Booked 5 eco-friendly cleaning services.',
      icon: '🌿',
      unlocked: false,
      progress: 2,
      total: 5,
    },
  ];

  const lifestyleLevels = [
    {
      id: 'level-1',
      name: 'Bronze Tier',
      description: 'Just starting your journey to a more effortless lifestyle.',
      progress: 30,
      total: 100, // Points to reach next level
      unlocked: true,
    },
    {
      id: 'level-2',
      name: 'Silver Tier',
            description: 'Consistently outsourcing and reclaiming your time.',
      progress: 0,
      total: 200,
      unlocked: false,
    },
    {
      id: 'level-3',
      name: 'Gold Tier',
      description: 'Master of outsourcing, enjoying a truly balanced life.',
      progress: 0,
      total: 300,
      unlocked: false,
    },
  ];

  return (
    <div className="p-4 pt-6">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-300">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Mine
      </button>
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">My Achievements</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Badges</h2>
        <div className="grid grid-cols-2 gap-4">
          {achievements.map(badge => (
            <div key={badge.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center flex flex-col items-center justify-center">
              <span className="text-5xl mb-2">{badge.icon}</span>
              <h3 className="font-semibold text-gray-800 text-lg mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
              {badge.unlocked ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Unlocked</span>
              ) : (
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">Progress: {badge.progress}/{badge.total}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lifestyle Levels</h2>
        <div className="space-y-4">
          {lifestyleLevels.map(level => (
            <div key={level.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 text-lg mb-1">{level.name} {level.unlocked && <span className="text-green-600 text-sm">(Current)</span>}</h3>
              <p className="text-sm text-gray-600 mb-3">{level.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(level.progress / level.total) * 100}%` }}></div>
              </div>
              {!level.unlocked && (
                <p className="text-xs text-gray-500 mt-2">Next Level: {level.total - level.progress} points to go!</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
