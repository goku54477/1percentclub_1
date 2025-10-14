import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, ShoppingCart, Info } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import CheckoutTransition from '@/components/CheckoutTransition';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getProductImage = (color) => {
    const imageMap = {
      'Turquoise Blue': '/assets/blue-model.png',
      'Grey': '/assets/white-model.png',
      'Green': '/assets/green-model.png',
      'Yellow': '/assets/yellow-model.png',
      'Red': '/assets/red-model.png',
      'Black': '/assets/black-model.png',
      'White': '/assets/white-model.png'
    };
    return imageMap[color] || imageMap['White'];
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      setShowTransition(true);
    }
  };

  const handleTransitionComplete = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/store');
  };

  if (cart.length === 0) {
    return (
      <>
        <AnimatePresence>
          {showTransition && (
            <CheckoutTransition onComplete={handleTransitionComplete} />
          )}
        </AnimatePresence>
        
        <div className="min-h-screen bg-black px-4 py-8 flex items-center justify-center" data-testid="cart-page">
          <Card className="max-w-2xl w-full text-center p-12 bg-zinc-900 border-zinc-800">
            <ShoppingCart className="w-16 h-16 text-zinc-500 mx-auto mb-6" />
            <h1 className="text-3xl font-light text-white mb-4 uppercase tracking-wider">
              Your Cart is Empty
            </h1>
            <p className="text-zinc-400 mb-8 text-lg">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button
              onClick={handleContinueShopping}
              className="max-w-md mx-auto bg-zinc-800 hover:bg-zinc-700 text-white"
              data-testid="continue-shopping-btn"
            >
              Continue Shopping
            </Button>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showTransition && (
          <CheckoutTransition onComplete={handleTransitionComplete} />
        )}
      </AnimatePresence>
      
      <div className="min-h-screen bg-black px-4 py-8" data-testid="cart-page">
      {/* Logo */}
      <div className="text-center mb-8">
        <img
          src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg"
          alt="Logo"
          className="h-16 w-auto mx-auto mb-4 drop-shadow-lg"
        />
      </div>

      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-light text-white mb-12 text-center uppercase tracking-wider">
        Your Shopping Cart
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <Card
              key={item.id}
              className="p-6 bg-zinc-900 border-zinc-800"
              data-testid={`cart-item-${item.id}`}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Product Image - with improved cropping */}
                <div className="w-full sm:w-32 h-40 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={getProductImage(item.color)}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {item.name}
                        </h3>
                        <p className="text-yellow-500 text-sm">
                          {item.color} • Size {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Remove item"
                        data-testid={`remove-item-${item.id}`}
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                    <p className="text-white font-bold text-lg mt-2">
                      ₹{item.price.toLocaleString()} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400 text-sm uppercase">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          disabled={(item.quantity || 1) <= 1}
                          className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50"
                          data-testid={`decrease-qty-${item.id}`}
                        >
                          -
                        </Button>
                        <span className="text-white font-semibold text-lg min-w-[2rem] text-center" data-testid={`quantity-${item.id}`}>
                          {item.quantity || 1}
                        </span>
                        <Button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          disabled={(item.quantity || 1) >= 10}
                          className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50"
                          data-testid={`increase-qty-${item.id}`}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-500 font-bold text-xl" data-testid={`item-total-${item.id}`}>
                        ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-zinc-900 border-zinc-800 sticky top-8" data-testid="order-summary">
            <h2 className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-wide">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-white text-lg">
                <span>Items ({getTotalItems()})</span>
                <span data-testid="items-total">₹{getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white text-lg">
                <span>Shipping</span>
                <span className="text-green-400" data-testid="shipping-cost">FREE</span>
              </div>
              <hr className="border-zinc-700 my-4" />
              <div className="flex justify-between text-white font-bold text-2xl">
                <span>Total</span>
                <span className="text-yellow-500" data-testid="grand-total">
                  ₹{getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleCheckout}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold text-lg py-6"
                data-testid="proceed-to-checkout-btn"
              >
                Proceed to Checkout
              </Button>
              <Button
                onClick={handleContinueShopping}
                variant="outline"
                className="w-full border-zinc-700 text-white hover:bg-zinc-800"
                data-testid="continue-shopping-btn"
              >
                Continue Shopping
              </Button>
            </div>

            <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-zinc-300 text-sm">
                  Your items are reserved for 15 minutes. Complete checkout to secure your purchase.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
};

export default Cart;
