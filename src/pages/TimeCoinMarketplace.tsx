import { useMemo, useState, useEffect } from "react";
import type { Order } from "../data";

type Props = {
  onBack: () => void;
  availableCoins?: number;
  onRedeem?: (productId: string, price: number, name: string) => void;
  orders?: Order[];
};

const products = [
  { id: "course", name: "Online Course Voucher", price: 50, description: "Access an online course of your choice.", category: "Self-Investment", image: "/assets/market/JavaScriptonlinecourse.png" },
  { id: "gym", name: "Gym 1-Month Pass", price: 80, description: "One month full access gym membership.", category: "Health & Wellness", image: "/assets/market/gym.png" },
  { id: "movie", name: "Family Movie Tickets", price: 60, description: "Two tickets for a family movie night.", category: "Relationships", image: "/assets/market/movieticket.jpeg" },
  { id: "cleaning", name: "20% Off Next Cleaning", price: 25, description: "Discount on your next cleaning service.", category: "Service Discounts", image: "/assets/market/20offvoucher.png" },
];

const categories = ["All", "Self-Investment", "Health & Wellness", "Relationships", "Service Discounts"];

export default function TimeCoinMarketplace({ onBack, availableCoins = 350, onRedeem, orders = [] }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[number] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 2500);
    return () => clearTimeout(t);
  }, [message]);

  const onClickRedeem = (p: typeof products[number]) => {
    if ((availableCoins ?? 0) < p.price) {
      setMessage("Not enough Time Coins to redeem this item.");
      return;
    }
    setSelectedProduct(p);
    setConfirmOpen(true);
  };

  const confirmRedeem = () => {
    if (!selectedProduct) return;
    setConfirmOpen(false);
    onRedeem && onRedeem(selectedProduct.id, selectedProduct.price, selectedProduct.name);
    setMessage(`Successfully redeemed ${selectedProduct.name} for ${selectedProduct.price} Coins.`);
    setSelectedProduct(null);
  };



    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-4 pt-6">
          <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-300">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
  
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Time Coin Marketplace</h1>
          <div className="text-sm text-gray-600 mb-6">{availableCoins} Time Coins Available</div>
  
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
  
          {/* Categories tab bar */}
          <div className="flex items-center gap-2 mb-4">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-full text-sm ${selectedCategory === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {c}
              </button>
            ))}
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="h-48 bg-gray-50 rounded mb-3 flex items-center justify-center overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{p.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-indigo-600 font-bold">{p.price} Coins</div>
                  <button
                    onClick={() => onClickRedeem(p)}
                    disabled={(availableCoins ?? 0) < p.price}
                    className={`px-3 py-1 text-white rounded transition ${ (availableCoins ?? 0) >= p.price ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}
                  >
                    {(availableCoins ?? 0) >= p.price ? 'Redeem' : 'Not enough Coins'}
                  </button>
                </div>
              </div>
            ))}
          </div>
  
          {/* Confirmation modal */}
          {confirmOpen && selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmOpen(false)} />
              <div className="relative z-10 bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
                <h3 className="text-lg font-semibold mb-2">Confirm redemption?</h3>
                <p className="text-sm text-gray-600 mb-4">This will deduct {selectedProduct.price} Time Coins for {selectedProduct.name}.</p>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setConfirmOpen(false)} className="px-3 py-1 rounded bg-gray-100">Cancel</button>
                  <button onClick={confirmRedeem} className="px-3 py-1 rounded bg-indigo-600 text-white">Confirm</button>
                </div>
              </div>
            </div>
          )}
  
          {message && <div className="mt-4 text-sm text-green-600">{message}</div>}
  
  
        </div>
      </div>
    );
  }
