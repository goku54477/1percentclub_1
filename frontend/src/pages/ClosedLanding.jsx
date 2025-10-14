import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WaitlistModal from '../components/WaitlistModal';

const ClosedLanding = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (password.toLowerCase() === '1percent') {
      // Set authenticated flag
      localStorage.setItem('authenticated', 'true');
      
      // Fade out and navigate
      const landingEl = document.getElementById('closed-landing');
      if (landingEl) {
        landingEl.style.opacity = '0';
        landingEl.style.transition = 'opacity 0.3s ease-in-out';
      }
      
      setTimeout(() => {
        navigate('/store');
      }, 300);
    } else {
      setError('Invalid password');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div 
      id="closed-landing"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 animate-fadeIn"
      style={{ animation: 'fadeIn 0.5s ease-in-out', backgroundColor: '#0b0b0a' }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          
          .shake {
            animation: shake 0.3s ease-in-out;
          }
          
          .glow-hover {
            transition: all 0.3s ease;
          }
          
          .glow-hover:hover {
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.6);
            transform: scale(1.02);
          }
          
          .button-glow:hover {
            box-shadow: 0 0 15px rgba(234, 179, 8, 0.5);
          }
        `}
      </style>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-8">
        {/* Logo */}
        <div className="mb-4">
          <img 
            src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg"
            alt="1% Logo"
            className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center uppercase tracking-wider">
          WE'RE CLOSED
        </h1>

        {/* Subtitle */}
        <p className="text-white text-lg md:text-xl text-center font-light">
          Unlock access. Join the waitlist.
        </p>

        {/* Password Form */}
        <form onSubmit={handlePasswordSubmit} className="w-full max-w-md mt-8">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Password"
              className={`flex-1 w-full sm:w-auto px-6 py-3 bg-gray-900 border ${
                error ? 'border-red-500' : 'border-gray-700'
              } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all ${
                isShaking ? 'shake' : ''
              }`}
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-gray-900 border border-gray-700 text-white font-bold rounded-lg uppercase hover:bg-white hover:text-black transition-all button-glow"
            >
              ENTER
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center shake">
              {error}
            </p>
          )}
        </form>

        {/* Hoodie Showcase */}
        <div className="w-full mt-12 mb-8 flex justify-center">
          <div className="max-w-6xl w-full">
            <img
              src="/assets/landing-hoodies.png"
              alt="1% Hoodies Collection"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Join Waitlist Button */}
        <div className="w-full max-w-xl mt-8">
          <button
            onClick={() => setShowWaitlistModal(true)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg uppercase tracking-wider text-lg transition-all shadow-lg glow-hover"
          >
            Join SMS Waitlist
          </button>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
      />
    </div>
  );
};

export default ClosedLanding;
