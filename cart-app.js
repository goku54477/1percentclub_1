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
              className="checkout-button"
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

function CartApp() {
  try {
    const [cart, setCart] = React.useState(() => {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    React.useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const updateQuantity = (id, newQuantity) => {
      if (newQuantity < 1) return;
      
      const updatedCart = cart.map(item => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      setCart(updatedCart);
    };

    const removeFromCart = (id) => {
      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);
    };

    const getTotalPrice = () => {
      return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const getTotalItems = () => {
      return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    };

    const handleCheckout = () => {
      if (cart.length > 0) {
        window.location.href = `confirmation.html?items=${getTotalItems()}&total=${getTotalPrice()}`;
      }
    };

    const handleContinueShopping = () => {
      window.location.href = 'store.html';
    };

    if (cart.length === 0) {
      return (
        <div className="min-h-screen px-4 py-8 flex items-center justify-center" data-name="cart-app" data-file="cart-app.js">
          <div className="cart-card max-w-2xl w-full text-center">
            <div className="mb-6">
              <div className="icon-shopping-cart text-6xl text-gray-500 mx-auto mb-4"></div>
            </div>
            <h1 className="cart-title">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8 text-lg">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button 
              onClick={handleContinueShopping}
              className="continue-shopping-btn max-w-md mx-auto"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen px-4 py-8" data-name="cart-app" data-file="cart-app.js">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg" 
            alt="Logo" 
            className="h-16 w-auto mx-auto mb-4 drop-shadow-lg"
          />
        </div>

        {/* Page Title */}
        <h1 className="cart-title">Your Shopping Cart</h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="cart-card">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={getProductImage(item.color)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">Premium Hoodie</h3>
                          <p className="text-[var(--luxury-gold)] text-sm">
                            {item.color} • Size {item.size}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="remove-btn"
                          title="Remove item"
                        >
                          <div className="icon-trash-2 text-lg"></div>
                        </button>
                      </div>
                      <p className="text-white font-bold text-lg mt-2">
                        ₹{item.price.toLocaleString()} each
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm uppercase">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                            className="quantity-btn"
                          >
                            -
                          </button>
                          <span className="text-white font-semibold text-lg min-w-[2rem] text-center">
                            {item.quantity || 1}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            disabled={(item.quantity || 1) >= 10}
                            className="quantity-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[var(--luxury-gold)] font-bold text-xl">
                          ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="cart-card sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-wide">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-white text-lg">
                  <span>Items ({getTotalItems()})</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white text-lg">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <hr className="border-white border-opacity-20 my-4" />
                <div className="flex justify-between text-white font-bold text-2xl">
                  <span>Total</span>
                  <span className="text-[var(--luxury-gold)]">₹{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleCheckout}
                  className="checkout-button"
                >
                  Proceed to Checkout
                </button>
                <button 
                  onClick={handleContinueShopping}
                  className="continue-shopping-btn"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="mt-6 p-4 bg-white bg-opacity-5 rounded-lg">
                <div className="flex items-start gap-2">
                  <div className="icon-info text-[var(--luxury-gold)] text-xl"></div>
                  <p className="text-gray-300 text-sm">
                    Your items are reserved for 15 minutes. Complete checkout to secure your purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CartApp component error:', error);
    return null;
  }
}

// Helper function to get product image URL based on color
function getProductImage(color) {
  const imageMap = {
    'Sky Blue': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/sky-blue.png.png',
    'Gray': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/gray.png.png',
    'Green': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/green.png.png',
    'Yellow': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/yellow.png.png',
    'Red': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/red.png.png',
    'Black': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/black.png.png'
  };
  return imageMap[color] || imageMap['Gray'];
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <CartApp />
  </ErrorBoundary>
);
