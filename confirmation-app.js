class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="back-button"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function ConfirmationApp() {
  try {
    return (
      <div className="min-h-screen bg-[#0b0b0a] flex flex-col items-center justify-center text-center px-4" data-name="confirmation-app" data-file="confirmation-app.js">
        {/* Logo */}
        <div className="mb-6 sm:mb-8">
          <img 
            src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg" 
            alt="Logo" 
            className="h-16 sm:h-20 w-auto mx-auto"
          />
        </div>
        
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 success-icon rounded-full flex items-center justify-center mx-auto">
            <div className="icon-check text-4xl text-white"></div>
          </div>
        </div>
        
        {/* Confirmation Message */}
        <div className="mb-10 px-4 premium-confirmation-card max-w-2xl">
          <h1 className="confirmation-title mb-4">
            YOUR ORDER
          </h1>
          <h2 className="confirmation-subtitle mb-6">
            WILL ARRIVE SOON
          </h2>
          <p className="text-white text-xl mt-6 font-light mb-4">
            Welcome to the exclusive club! 🔥
          </p>
          <p className="text-gray-300 text-lg font-light leading-relaxed">
            Your premium merchandise is being carefully prepared by our team and will ship within 24-48 hours with express delivery.
          </p>
        </div>
        
        {/* Order Details */}
        <div className="premium-confirmation-card mb-10 max-w-lg w-full">
          <h3 className="text-white text-xl font-bold mb-6 text-center tracking-wide">ORDER SUMMARY</h3>
          <div className="text-left space-y-4">
            <div className="flex justify-between text-white text-lg">
              <span>Premium Hoodies</span>
              <span>₹{(4999 * Math.max(1, parseInt(new URLSearchParams(window.location.search).get('items') || '1'))).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white text-lg">
              <span>Express Shipping</span>
              <span className="text-[#22C55E]">FREE</span>
            </div>
            <hr className="border-white border-opacity-20 my-4" />
            <div className="flex justify-between text-white font-bold text-xl">
              <span>TOTAL</span>
              <span className="text-[var(--luxury-gold)]">₹{(4999 * Math.max(1, parseInt(new URLSearchParams(window.location.search).get('items') || '1'))).toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Payment Information */}
        <div className="premium-confirmation-card mb-10 max-w-lg w-full">
          <h3 className="text-white text-xl font-bold mb-6 text-center tracking-wide">PAYMENT DETAILS</h3>
          <div className="text-center space-y-4">
            <p className="text-white text-lg">Complete your payment using UPI:</p>
            <div className="bg-[var(--luxury-gold)] text-black p-4 rounded-lg">
              <p className="text-lg font-bold">talldarksavage@oksbi</p>
            </div>
            <p className="text-gray-300 text-sm">
              Send the exact amount and your order will be processed within 24 hours
            </p>
          </div>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => window.location.href = 'index.html'}
          className="back-button"
        >
          BACK TO HOMEPAGE
        </button>
        
        {/* Social Media */}
        <div className="text-center px-4 mt-8">
          <p className="text-white text-sm font-bold mb-2">FOLLOW US AT</p>
          <div className="flex items-center justify-center space-x-4">
            <a href="#" className="text-white hover:text-[var(--accent-color)] transition-colors duration-200">
              <div className="icon-instagram text-xl"></div>
            </a>
            <a href="#" className="text-white hover:text-[var(--accent-color)] transition-colors duration-200">
              <div className="icon-music text-xl"></div>
            </a>
            <a href="#" className="text-white hover:text-[var(--accent-color)] transition-colors duration-200">
              <div className="icon-twitter text-xl"></div>
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ConfirmationApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <ConfirmationApp />
  </ErrorBoundary>
);