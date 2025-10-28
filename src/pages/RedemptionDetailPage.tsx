import type { Order } from "../data";

type Props = {
  order: Order;
  onBack: () => void;
};

export default function RedemptionDetailPage({ order, onBack }: Props) {
  return (
    <div className="p-4 pt-6">
      <button onClick={onBack} className="mb-4 text-gray-500 hover:text-gray-800 transition-colors flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-3">Redemption Details</h2>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
        <p className="font-semibold text-gray-800">Product</p>
        <p className="text-gray-600 mb-2">{order.service}</p>

        <p className="font-semibold text-gray-800">Redeemed On</p>
        <p className="text-gray-600 mb-2">{new Date(order.createdAt).toLocaleDateString()}</p>

        <div className="mt-4 border-t pt-3">
          <p className="text-lg font-bold text-indigo-600">Cost: {order.price} TimeCoins</p>
        </div>
      </div>

      <button onClick={onBack} className="w-full py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors">
        Return
      </button>
    </div>
  );
}
