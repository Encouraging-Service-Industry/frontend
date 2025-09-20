type Props = {
  providerName: string;
  onBack: () => void;
};

export default function ChatPage({ providerName, onBack }: Props) {
  return (
    <div className="p-4 pt-6 flex flex-col justify-between h-full">
      <div>
        <button onClick={onBack} className="mb-4 text-gray-500 hover:text-gray-800 transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chat with {providerName}</h2>
        <div className="h-72 bg-gray-100 p-4 rounded-xl overflow-y-auto mb-4">
          <div className="flex justify-end mb-2">
            <div className="bg-indigo-500 text-white p-2 rounded-lg max-w-[75%]">Hi {providerName}, I have a few questions about your cleaning service.</div>
          </div>
          <div className="flex justify-start mb-2">
            <div className="bg-white text-gray-800 p-2 rounded-lg max-w-[75%]">Hello Anna! I'd be happy to help. What would you like to know?</div>
          </div>
        </div>
      </div>
      <div className="flex">
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="ml-2 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
