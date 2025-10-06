function ProductCard({ onAddToCart, cartCount, maxItems }) {
  try {
    const sizes = ['M', 'L', 'XL', 'XXL', 'XXXL'];
    // Order: Row 1: Sky Blue, Gray, Green; Row 2: Yellow, Red, Black
    const hoodies = [
      { 
        id: 'blue',
        name: 'Sky Blue',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/sky-blue.png.png',
        color: 'Sky Blue'
      },
      { 
        id: 'grey',
        name: 'Gray',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/gray.png.png',
        color: 'Gray'
      },
      { 
        id: 'green',
        name: 'Green',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/green.png.png',
        color: 'Green'
      },
      { 
        id: 'yellow',
        name: 'Yellow',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/yellow.png.png',
        color: 'Yellow'
      },
      { 
        id: 'red',
        name: 'Red',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/red.png.png',
        color: 'Red'
      },
      { 
        id: 'black',
        name: 'Black',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/a3d8a58cdd60d959628f805d2fee3a0a33c4a0f1/trickle/assets/black.png.png',
        color: 'Black'
      }
    ];

    return (
      <div className="w-full" data-name="product-grid" data-file="components/ProductCard.js">
        {/* Product Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {hoodies.map(hoodie => (
            <HoodieCard
              key={hoodie.id}
              hoodie={hoodie}
              sizes={sizes}
              onAddToCart={onAddToCart}
              isCartFull={cartCount >= maxItems}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProductCard component error:', error);
    return null;
  }
}

function HoodieCard({ hoodie, sizes, onAddToCart, isCartFull }) {
  try {
    const [selectedSize, setSelectedSize] = React.useState('');

    const handleRequestAccess = () => {
      if (selectedSize && !isCartFull) {
        onAddToCart({
          name: hoodie.name,
          size: selectedSize,
          color: hoodie.color,
          price: 4899
        });
        setSelectedSize('');
      }
    };

    return (
      <div className="flex flex-col items-center text-center w-full" data-name="hoodie-card" data-file="components/ProductCard.js">
        {/* Hoodie Image with light background - Fixed aspect ratio for consistency */}
        <div className="mb-5 w-full bg-gray-100 rounded overflow-hidden aspect-square flex items-center justify-center">
          <img 
            src={hoodie.image}
            alt={hoodie.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Info - Perfectly Centered and Stacked */}
        <div className="flex flex-col items-center w-full space-y-2">
          {/* Product Name */}
          <h3 className="text-lg font-normal text-white tracking-wide">{hoodie.name}</h3>
          
          {/* Limited Stock Text */}
          <p className="text-xs text-gray-400 font-light">1 of 30 Only</p>
          
          {/* Price */}
          <p className="text-base font-normal text-white">₹4,899</p>
          
          {/* Size Options - Centered */}
          <div className="flex justify-center items-center gap-2 pt-2 w-full">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border px-2.5 py-1 text-xs font-light transition-all ${
                  selectedSize === size 
                    ? 'border-white bg-white text-black' 
                    : 'border-gray-600 bg-transparent text-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          
          {/* Request Access Button - Full width of content block, centered */}
          <div className="w-full pt-2">
            <button
              onClick={handleRequestAccess}
              disabled={!selectedSize || isCartFull}
              className="w-full px-6 py-2.5 bg-gray-700 text-white font-light text-xs uppercase tracking-widest hover:bg-gray-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Request Access
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('HoodieCard component error:', error);
    return null;
  }
}
