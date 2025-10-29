import type { Order } from "../data";

type Props = {
  order: Order;
  onBack: () => void;
  onStartTracking?: (bookingId: string) => void;
  onSimulateConfirm?: (orderId: string) => void;
};

export default function OrderDetailPage({ order, onBack, onStartTracking, onSimulateConfirm }: Props) {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 pt-6 pb-8">
      <button onClick={onBack} className="mb-4 text-gray-500 hover:text-gray-800 transition-colors flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-3">Order Details</h2>

      <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {/* Left Column */}
          <div className="flex flex-col items-start">
            <p className="text-sm font-medium text-gray-500">Service</p>
            <p className="text-lg font-semibold text-gray-900 mb-3">{order.service}</p>

            <p className="text-sm font-medium text-gray-500">Provider</p>
            <p className="text-lg font-semibold text-gray-900">{order.providerName}</p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-start mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex flex-col items-start">
                <p className="text-sm font-medium text-gray-500">When</p>
                <p className="text-lg font-semibold text-gray-900">{order.date} · {order.timeSlot}</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="flex flex-col items-start">
                <p className="text-sm font-medium text-gray-500">Where</p>
                <p className="text-lg font-semibold text-gray-900">{order.address}</p>
              </div>
            </div>
          </div>

          {/* Recipient - Spans full width below */}
          <div className="md:col-span-2 flex flex-col items-start mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-500">Recipient</p>
            <p className="text-lg font-semibold text-gray-900">{order.recipient}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900">Price: ${order.price}</p>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "confirmed" ? "bg-green-100 text-green-800" : order.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        {order.status === "confirmed" ? (
          onStartTracking && (
            <button
              onClick={() => onStartTracking(order.id)}
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              📍 Start Location Tracking
            </button>
          )
        ) : (
          <>
            <button disabled className="w-full py-3 px-4 bg-gray-200 text-gray-600 font-semibold rounded-xl cursor-not-allowed">
              📍 Start Location Tracking (waiting for supplier confirmation)
            </button>
            {order.status === "pending" && (
              <button
                onClick={() => onSimulateConfirm?.(order.id)}
                className="w-full py-3 px-4 border border-yellow-500 text-yellow-700 font-semibold rounded-xl hover:bg-yellow-50 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Simulate Supplier Confirm
              </button>
            )}
          </>
        )}

        <button onClick={onBack} className="w-full py-3 px-4 bg-gray-100 text-gray-800 font-semibold rounded-xl shadow-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
          Return to My Orders
        </button>
      </div>
    </div>
  );
}
