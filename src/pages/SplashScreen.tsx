type Props = {
  onStart: () => void;
};

export default function SplashScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-screen">
      <img src="https://placehold.co/150x150/e0e7ff/4f46e5?text=App+Logo" className="rounded-full mb-6" alt="App Logo" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Get Your Life Back</h1>
      <p className="text-gray-500 mb-8">A platform to help you live a more efficient and joyful life.</p>
      <button 
        onClick={onStart}
        className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        Get Started
      </button>
    </div>
  );
}
