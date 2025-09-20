export default function OrdersPage() {
  return (
    <div className="p-4 pt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">Home Cleaning</h3>
            <span className="text-sm text-green-600 font-medium">Completed</span>
          </div>
          <p className="text-sm text-gray-500 mb-2">Provider: Jane</p>
          <p className="text-sm text-gray-500">Date: October 28, 2024</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">Meal Delivery</h3>
            <span className="text-sm text-blue-600 font-medium">In Progress</span>
          </div>
          <p className="text-sm text-gray-500 mb-2">Provider: Leo</p>
          <p className="text-sm text-gray-500">Date: November 5, 2024</p>
        </div>
      </div>
    </div>
  );
}



