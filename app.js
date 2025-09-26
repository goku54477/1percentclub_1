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
              className="btn btn-black"
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

function App() {
  try {
    const [isLogoFading, setIsLogoFading] = React.useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = React.useState(false);

    return (
      <>
        {/* Loading Screen */}
        {showLoadingScreen && (
          <div className={`loading-screen ${showLoadingScreen ? 'active' : ''}`}>
            <img 
              src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg" 
              alt="Loading" 
              className="loading-logo h-20 sm:h-24 w-auto"
            />
          </div>
        )}
        
        <div className="min-h-screen bg-[#0b0b0a] flex flex-col items-center justify-center text-center px-4" data-name="app" data-file="app.js">
        {/* Logo */}
        <div className="mb-6 sm:mb-8">
          <img 
            src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg" 
            alt="Logo" 
            className={`h-16 sm:h-20 w-auto mx-auto logo-fade ${isLogoFading ? 'loading' : ''}`}
          />
        </div>
        
        {/* Main title */}
        <div className="mb-6 sm:mb-8 px-4">
          <h1 className="main-title">
            WE'RE CLOSED
          </h1>
          <h2 className="subtitle">UNLOCK ACCESS. JOIN WAITLIST</h2>
        </div>
        
        {/* Password form */}
        <div className="mb-4 sm:mb-6 w-full max-w-2xl">
          <PasswordForm 
            onStartTransition={() => setIsLogoFading(true)}
            onShowLoading={() => setShowLoadingScreen(true)}
          />
        </div>
        
        {/* Premium showcase */}
        <div className="w-full max-w-4xl px-4 sm:px-8 mb-8">
          <img 
            src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/9626574b-546d-4c8e-abb5-f0717cfa66e5.png" 
            alt="Premium Collection" 
            className="w-full h-auto object-cover rounded-lg shadow-2xl max-h-80 sm:max-h-96"
          />
        </div>
        
        {/* Join Waitlist Button */}
        <div className="mb-6 w-full max-w-2xl">
          <EmailForm />
        </div>
        
        {/* Social Media Section */}
        <div className="text-center px-4" data-name="social-media" data-file="app.js">
          <p className="text-white text-sm mb-2" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>FOLLOW US AT</p>
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
      </>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);