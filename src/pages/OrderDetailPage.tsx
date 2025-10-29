import type { Order } from "../data";

type Props = {
  order: Order;
  onBack: () => void;
  onStartTracking?: (bookingId: string) => void;
  onSimulateConfirm?: (orderId: string) => void;
};

export default function OrderDetailPage({ order, onBack, onStartTracking, onSimulateConfirm }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-6">
      <button onClick={onBack} className="mb-4 text-gray-500 hover:text-gray-800 transition-colors flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-3">Order Details</h2>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
        <p className="font-semibold text-gray-800">Service</p>
        <p className="text-gray-600 mb-2">{order.service}</p>

        <p className="font-semibold text-gray-800">Provider</p>
        <p className="text-gray-600 mb-2">{order.providerName}</p>

        <p className="font-semibold text-gray-800">When</p>
        <p className="text-gray-600 mb-2">{order.date} · {order.timeSlot}</p>

        <p className="font-semibold text-gray-800">Where</p>
        <p className="text-gray-600 mb-2">{order.address}</p>

        <p className="font-semibold text-gray-800">Recipient</p>
        <p className="text-gray-600 mb-2">{order.recipient}</p>

        <div className="mt-4 border-t pt-3">
          <p className="text-lg font-bold text-indigo-600">Price: ${order.price}</p>
          <p className="text-sm text-gray-500">Status: {order.status}</p>
        </div>
      </div>

      <div className="space-y-3">
  {order.status === "confirmed" ? (
          onStartTracking && (
            <button
              onClick={() => onStartTracking(order.id)}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
            >
              📍 Start Location Tracking
            </button>
          )
        ) : (
          <div className="space-y-2">
            <button disabled className="w-full py-3 bg-gray-300 text-gray-600 font-semibold rounded-full">
              📍 Start Location Tracking (waiting for supplier confirmation)
            </button>
            {order.status === "pending" && (
              <button
                onClick={() => onSimulateConfirm?.(order.id)}
                className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600 transition-colors"
              >
                Simulate Supplier Confirm
              </button>
            )}
          </div>
        )}

        <button onClick={onBack} className="w-full py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors">
          Return
        </button>
      </div>
    </div>
  );
}
