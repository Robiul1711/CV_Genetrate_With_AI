import React from 'react';
import { XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const PaymentCancelled = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  // English texts
  const texts = {
    title: 'Payment Cancelled',
    message: 'Your payment could not be processed. Please try again or contact support.',
    button: 'Back to Home'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-900 rounded-xl shadow-lg p-10 max-w-md w-full text-center">
        <XCircle className="mx-auto text-red-500 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">{texts.title}</h1>
        <p className="text-gray-400 mb-6">{texts.message}</p>
        <button
          onClick={handleBackToHome}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {texts.button}
        </button>
      </div>
    </div>
  );
};

export default PaymentCancelled;
