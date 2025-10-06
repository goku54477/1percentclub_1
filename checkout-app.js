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
              className="submit-button"
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

function CheckoutApp() {
  try {
    const [cart, setCart] = React.useState(() => {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    });

    const [formData, setFormData] = React.useState({
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      pinCode: '',
      phone: ''
    });

    const [errors, setErrors] = React.useState({});

    const getTotalPrice = () => {
      return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const getTotalItems = () => {
      return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };

    const validateForm = () => {
      const newErrors = {};
      
      // Email validation
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      
      // Required fields
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pinCode) newErrors.pinCode = 'PIN code is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      
      // Phone validation (10 digits)
      if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone must be 10 digits';
      }
      
      // PIN code validation (6 digits)
      if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
        newErrors.pinCode = 'PIN code must be 6 digits';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        // Store form data in localStorage
        localStorage.setItem('checkoutData', JSON.stringify(formData));
        // Redirect to confirmation
        window.location.href = `confirmation.html?items=${getTotalItems()}&total=${getTotalPrice()}`;
      }
    };

    const handleBackToCart = () => {
      window.location.href = 'cart.html';
    };

    if (cart.length === 0) {
      return (
        <div className="min-h-screen px-4 py-8 flex items-center justify-center" data-name="checkout-app" data-file="checkout-app.js">
          <div className="checkout-card max-w-2xl w-full text-center">
            <div className="mb-6">
              <div className="icon-shopping-cart text-6xl text-gray-500 mx-auto mb-4"></div>
            </div>
            <h1 className="checkout-title">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8 text-lg">
              Please add items to your cart before checkout.
            </p>
            <button 
              onClick={() => window.location.href = 'store.html'}
              className="submit-button max-w-md mx-auto"
            >
              Go to Store
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen px-4 py-8" data-name="checkout-app" data-file="checkout-app.js">
        {/* Logo - Prominently Displayed */}
        <div className="text-center mb-8">
          <img 
            src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg" 
            alt="1% Club Logo" 
            className="h-20 w-auto mx-auto mb-4 drop-shadow-lg"
          />
          <h1 className="text-3xl font-light text-white uppercase tracking-wider">Checkout</h1>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Progress Bar */}
          <div className="relative mb-8">
            <div className="progress-line"></div>
            <div className="progress-bar max-w-2xl mx-auto">
              <div className="progress-step">
                <div className="progress-circle inactive">1</div>
                <span className="text-xs text-gray-400 uppercase">Cart</span>
              </div>
              <div className="progress-step">
                <div className="progress-circle active">2</div>
                <span className="text-xs text-white uppercase font-semibold">Information</span>
              </div>
              <div className="progress-step">
                <div className="progress-circle inactive">3</div>
                <span className="text-xs text-gray-400 uppercase">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Checkout Form - Takes 3 columns */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="checkout-card">
                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wide">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="form-input"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wide">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="form-input"
                        />
                        {errors.firstName && (
                          <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="form-label">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="form-input"
                        />
                        {errors.lastName && (
                          <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        className="form-input"
                      />
                      {errors.address && (
                        <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Apartment, Suite, etc. (Optional)</label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        placeholder="Apt 4B"
                        className="form-input"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="form-label">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Mumbai"
                          className="form-input"
                        />
                        {errors.city && (
                          <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="form-label">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Maharashtra"
                          className="form-input"
                        />
                        {errors.state && (
                          <p className="text-red-400 text-sm mt-1">{errors.state}</p>
                        )}
                      </div>
                      <div>
                        <label className="form-label">PIN Code *</label>
                        <input
                          type="text"
                          name="pinCode"
                          value={formData.pinCode}
                          onChange={handleInputChange}
                          placeholder="400001"
                          maxLength="6"
                          className="form-input"
                        />
                        {errors.pinCode && (
                          <p className="text-red-400 text-sm mt-1">{errors.pinCode}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        maxLength="10"
                        className="form-input"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    type="button"
                    onClick={handleBackToCart}
                    className="back-to-cart-btn"
                  >
                    <div className="icon-arrow-left inline-block mr-2"></div>
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="submit-button flex-1"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="checkout-card sticky top-8">
                <h2 className="text-xl font-semibold text-white mb-6 uppercase tracking-wide">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 bg-white bg-opacity-5 rounded-lg">
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={getProductImage(item.color)}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                        <p className="text-[var(--luxury-gold)] text-xs mt-1">
                          {item.color} • Size {item.size}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-400 text-sm">Qty: {item.quantity || 1}</span>
                          <span className="text-white font-semibold">
                            ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-4 border-t border-white border-opacity-20">
                  <div className="flex justify-between text-white text-base">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white text-base">
                    <span>Shipping</span>
                    <span className="text-green-400">FREE</span>
                  </div>
                  <hr className="border-white border-opacity-20" />
                  <div className="flex justify-between text-white font-bold text-xl">
                    <span>Total</span>
                    <span className="text-[var(--luxury-gold)]">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-white bg-opacity-5 rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="icon-shield-check text-green-400 text-xl"></div>
                    <p className="text-gray-300 text-sm">
                      Your payment information is secure and encrypted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CheckoutApp component error:', error);
    return null;
  }
}

// Helper function to get product image URL based on color
function getProductImage(color) {
  const imageMap = {
    'Turquoise Blue': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/blue1.jpg',
    'Grey': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/grey1.jpg',
    'Green': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/green1.jpg',
    'Yellow': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/yellow1.jpg',
    'Red': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/red1.jpg',
    'Black': 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/black1.jpg'
  };
  return imageMap[color] || imageMap['Grey'];
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <CheckoutApp />
  </ErrorBoundary>
);
