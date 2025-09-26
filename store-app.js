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
              className="add-to-cart-btn"
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

function StoreApp() {
  try {
    const [cart, setCart] = React.useState([]);
    const [showCart, setShowCart] = React.useState(false);
    const maxItems = 3;

    const addToCart = (product) => {
      if (cart.length < maxItems) {
        setCart([...cart, { ...product, id: Date.now() }]);
      }
    };

    const removeFromCart = (id) => {
      setCart(cart.filter(item => item.id !== id));
    };

    const getTotalPrice = () => {
      return cart.reduce((total, item) => total + item.price, 0);
    };

    const handleCheckout = () => {
      if (cart.length > 0) {
        window.location.href = `confirmation.html?items=${cart.length}&total=${getTotalPrice()}`;
      }
    };

    return (
      <div className="min-h-screen px-4 py-8" data-name="store-app" data-file="store-app.js">
        {/* Cart Counter */}
        {cart.length > 0 && (
          <button 
            onClick={() => setShowCart(!showCart)}
            className="cart-counter"
          >
            <div className="icon-shopping-cart text-lg inline-block mr-2"></div>
            {cart.length}/{maxItems}
          </button>
        )}
        
        {/* Premium Cart Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-96 bg-black bg-opacity-95 backdrop-blur-xl border-l border-[var(--luxury-gold)] border-opacity-30 transform transition-transform duration-300 z-50 ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">Your Cart</h3>
              <button 
                onClick={() => setShowCart(false)}
                className="text-[var(--luxury-gold)] hover:text-white transition-colors"
              >
                <div className="icon-x text-xl"></div>
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white bg-opacity-5 border border-[var(--luxury-gold)] border-opacity-20 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-semibold">Premium Hoodie</h4>
                          <p className="text-[var(--luxury-gold)] text-sm">{item.color} • Size {item.size}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-1"
                        >
                          <div className="icon-trash-2 text-sm"></div>
                        </button>
                      </div>
                      <p className="text-white font-bold text-lg">₹{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-[var(--luxury-gold)] border-opacity-20 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-semibold">Total ({cart.length} items)</span>
                    <span className="text-[var(--luxury-gold)] font-bold text-xl">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-[var(--luxury-gold)] to-yellow-600 text-black font-bold py-3 px-6 rounded-xl uppercase tracking-wide hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Overlay */}
        {showCart && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowCart(false)}
          ></div>
        )}
        
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg" 
            alt="Logo" 
            className="h-16 w-auto mx-auto mb-4 drop-shadow-lg"
          />
        </div>
        
        {/* Store Title */}
        <h1 className="store-title">
          Exclusive. Limited.<br />
          Invite-Only.
        </h1>
        
        {/* Product Grid */}
        <div className="max-w-4xl mx-auto">
          <ProductCard 
            onAddToCart={addToCart}
            cartCount={cart.length}
            maxItems={maxItems}
          />
        </div>
        
        {/* Floating Checkout Button */}
        {cart.length > 0 && (
          <button 
            onClick={handleCheckout}
            className="checkout-btn"
          >
            CHECKOUT ₹{getTotalPrice().toLocaleString()}
          </button>
        )}
      </div>
    );
  } catch (error) {
    console.error('StoreApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <StoreApp />
  </ErrorBoundary>
);