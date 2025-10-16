type Props = {
  onStart: () => void;
};

export default function SplashScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-screen">
      <img
        src="/assets/brandlogo.png"
        className="mb-6 h-32 w-auto"
        alt="App Logo"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Get Your Life Back
      </h1>
      <p className="text-gray-500 mb-8">
        A platform to help you live a more efficient and joyful life.
      </p>
      <button
        onClick={onStart}
        className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        Get Started
      </button>
    </div>
  );
}
