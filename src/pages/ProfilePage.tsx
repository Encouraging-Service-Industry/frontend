export default function ProfilePage() {
  return (
    <div className="p-4 pt-6">
      <div className="flex items-center justify-center mb-6">
        <img src="https://placehold.co/120x120/e0e7ff/4f46e5?text=Anna" className="rounded-full mr-4 border-4 border-indigo-200 shadow-lg" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Anna</h2>
        <p className="text-gray-500 mb-6">Busy Marketing Manager</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">My Information</h3>
        <ul className="space-y-2 text-gray-600">
          <li><span className="font-medium">Email:</span> anna@example.com</li>
          <li><span className="font-medium">Location:</span> Beijing, China</li>
          <li><span className="font-medium">Status:</span> Verified User</li>
        </ul>
      </div>
      <button className="w-full py-3 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition-colors">Log Out</button>
    </div>
  );
}


