import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

const Store = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  });

  const products = [
    {
      id: 'green-goblin',
      name: '[ GREEN GOBLIN ]',
      price: 4899,
      colors: ['Green', 'Black', 'Red', 'Yellow', 'Turquoise Blue', 'Grey'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      image: '/assets/green-model.png'
    }
  ];

  const addToCart = (product, color, size) => {
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItem = cart.find(
      item => item.id === `${product.id}-${color}-${size}`
    );

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({
        id: `${product.id}-${color}-${size}`,
        name: product.name,
        price: product.price,
        color: color,
        size: size,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    const newCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(newCount);
    
    toast.success('Added to cart!', {
      description: `${product.name} (${color}, ${size})`
    });
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8" data-testid="store-page">
      {/* Header with Cart */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <img
            src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg"
            alt="Logo"
            className="h-16 w-auto"
          />
          <Button
            onClick={() => navigate('/cart')}
            className="relative bg-yellow-600 hover:bg-yellow-700 text-black"
            data-testid="cart-icon-btn"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center" data-testid="cart-count">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Store Title */}
      <h1 className="text-5xl font-light text-white mb-12 text-center uppercase tracking-wider">
        Premium Collection
      </h1>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default to 'L'

  const getProductImage = (color) => {
    const imageMap = {
      'Turquoise Blue': '/assets/blue-model.png',
      'Grey': '/assets/white-model.png',
      'Green': '/assets/green-model.png',
      'Yellow': '/assets/yellow-model.png',
      'Red': '/assets/red-model.png',
      'Black': '/assets/black-model.png'
    };
    return imageMap[color] || product.image;
  };

  return (
    <Card className="p-6 bg-zinc-900 border-zinc-800 hover:border-yellow-600 transition-colors" data-testid={`product-${product.id}`}>
      {/* Product Image */}
      <div className="w-full h-80 bg-zinc-800 rounded-lg overflow-hidden mb-4">
        <img
          src={getProductImage(selectedColor)}
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-2xl font-semibold text-white mb-2">{product.name}</h3>
      <p className="text-yellow-500 text-2xl font-bold mb-4">₹{product.price.toLocaleString()}</p>

      {/* Color Selection */}
      <div className="mb-4">
        <label className="text-zinc-300 text-sm mb-2 block">Color:</label>
        <div className="flex flex-wrap gap-2">
          {product.colors.map(color => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-3 py-1 text-sm rounded ${
                selectedColor === color
                  ? 'bg-yellow-600 text-black'
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
              data-testid={`color-${color.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-4">
        <label className="text-zinc-300 text-sm mb-2 block">Size:</label>
        <div className="flex gap-2">
          {product.sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 text-sm rounded ${
                selectedSize === size
                  ? 'bg-yellow-600 text-black'
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
              data-testid={`size-${size.toLowerCase()}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={() => onAddToCart(product, selectedColor, selectedSize)}
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold text-lg py-6"
        data-testid="add-to-cart-btn"
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default Store;
