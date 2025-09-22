type Props = {
  onBack: () => void;
};

export default function ValueDashboardDetailPage({ onBack }: Props) {
  // Mock data for demonstration purposes
  const totalHoursSaved = 35;
  const totalStressReduced = "significantly";
  const weeklyGains = [
    { week: "Last Week", hours: 5, activities: "one family dinner + one bedtime story" },
    { week: "2 Weeks Ago", hours: 7, activities: "a weekend hike + meal prep" },
    { week: "3 Weeks Ago", hours: 4, activities: "a leisurely morning + coffee with a friend" },
  ];

  const serviceImpact = [
    { service: "Home Cleaning", hours: 15 },
    { service: "Errand Service", hours: 10 },
    { service: "Appliance Repair", hours: 5 },
    { service: "Gardening", hours: 5 },
  ];

  const recommendations = [
    {
      title: "Consider a personal assistant",
      description: "You spend a lot of time on administrative tasks. An assistant could save you 3-5 hours/week.",
      action: "Explore Personal Assistant Services →",
    },
    {
      title: "Delegate grocery shopping",
      description: "Save 2 hours weekly by using a grocery delivery service.",
      action: "Find Grocery Delivery →",
    },
  ];

  const achievements = [
    { name: "Time Saver Pro", description: "Saved over 20 hours!" },
    { name: "Smart Outsourcer", description: "Used 3+ different services." },
  ];

  return (
    <div className="p-4 pt-6">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-300">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Your Value Dashboard</h1>

      <div className="bg-indigo-600 text-white p-6 rounded-2xl mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Total Gains So Far:</h2>
        <p className="text-5xl font-bold mb-2">{totalHoursSaved} hours saved</p>
        <p className="text-xl">and stress reduced {totalStressReduced}!</p>
        <p className="mt-4 text-md">This is equivalent to...</p>
        <p className="text-lg font-bold">multiple family dinners, bedtime stories, and personal hobby time!</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Weekly Gains</h2>
        <div className="space-y-3">
          {weeklyGains.map((gain, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800">{gain.week}: <span className="text-indigo-600">{gain.hours} hours saved</span></h3>
              <p className="text-sm text-gray-500">Equivalent to: {gain.activities}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Impact by Service Category</h2>
        <div className="space-y-3">
          {serviceImpact.map((impact, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">{impact.service}</h3>
              <span className="text-indigo-600 font-bold">{impact.hours} hours</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Smart Recommendations</h2>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-1">{rec.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{rec.description}</p>
              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">{rec.action}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Achievements</h2>
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((ach, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-indigo-500 text-4xl mb-2">⭐</div> {/* Placeholder for an icon/badge */}
              <h3 className="font-semibold text-gray-800">{ach.name}</h3>
              <p className="text-sm text-gray-500">{ach.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
