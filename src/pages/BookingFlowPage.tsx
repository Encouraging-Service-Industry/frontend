import { useState } from 'react';
import type { Provider } from '../data';

type Props = {
  provider: Provider;
  onBack: () => void;
  onComplete: () => void;
};

export default function BookingFlowPage({ provider, onBack, onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    address: '',
    recipient: 'myself'
  });

  const handleNextStep1 = () => {
    if (bookingData.date && bookingData.time && bookingData.address) {
      setStep(2);
    }
  };

  const handleConfirmBooking = () => {
    setStep(3);
  };

  const handleFinish = () => {
    onComplete();
  };

  return (
    <div className="p-4 pt-6">
      <button onClick={onBack} className="mb-4 text-gray-500 hover:text-gray-800 transition-colors flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Service</h2>
      
      {step === 1 && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Step 1: Choose Time and Address</h3>
          <div className="space-y-4">
            <input 
              type="date" 
              value={bookingData.date}
              onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input 
              type="time" 
              value={bookingData.time}
              onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input 
              type="text" 
              placeholder="Enter service address"
              value={bookingData.address}
              onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select 
              value={bookingData.recipient}
              onChange={(e) => setBookingData({...bookingData, recipient: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="myself">Recipient: Myself</option>
              <option value="parent">Recipient: My Parent</option>
              <option value="other">Recipient: Someone Else</option>
            </select>
          </div>
          <button 
            onClick={handleNextStep1}
            className="mt-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
          >
            Next Step
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Step 2: Confirm Order Details</h3>
          <div className="bg-gray-100 p-4 rounded-xl mb-4">
            <p className="font-medium text-gray-800">Service: {provider.service} with {provider.name}</p>
            <p className="text-gray-600">Time: {bookingData.date} at {bookingData.time}</p>
            <p className="text-gray-600">Address: {bookingData.address}</p>
            <p className="text-gray-600">Recipient: {bookingData.recipient}</p>
            <div className="mt-2 pt-2 border-t border-gray-300">
              <p className="text-lg font-bold text-indigo-600">Total Price: ${provider.price || 50}</p>
            </div>
          </div>
          <button 
            onClick={handleConfirmBooking}
            className="mt-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
          >
            Confirm and Pay
          </button>
        </div>
      )}
      
      {step === 3 && (
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Successful!</h3>
          <p className="text-gray-600 mb-4">Congratulations, you've just earned some free time for yourself.</p>
          <button 
            onClick={handleFinish}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
}
