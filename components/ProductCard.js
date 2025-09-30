function ProductCard({ onAddToCart, cartCount, maxItems }) {
  try {
    const sizes = ['M', 'L', 'XL', 'XXXL'];
    // Order: Row 1: Sky Blue, Gray, Green; Row 2: Yellow, Red, Black
    const hoodies = [
      { 
        id: 'blue',
        name: 'Sky Blue',
        image: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/040f64df-649f-46b7-a1d0-8813528485cf.png',
        color: 'Sky Blue'
      },
      { 
        id: 'grey',
        name: 'Gray',
        image: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/02643f26-a168-44d2-9060-1e1bc0dc0aba.png',
        color: 'Gray'
      },
      { 
        id: 'green',
        name: 'Green',
        image: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/78a821ed-c299-48d5-bec5-c81318c4840c.png',
        color: 'Green'
      },
      { 
        id: 'yellow',
        name: 'Yellow',
        image: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/6cb4dc1e-f371-464e-a857-1eb8b15bf359.png',
        color: 'Yellow'
      },
      { 
        id: 'red',
        name: 'Red',
        image: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/94e05891-922a-4cb6-b136-83dc03d915df.png',
        color: 'Red'
      },
      { 
        id: 'black',
        name: 'Black',
        image: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/15f4b7fc-56b6-440d-a8a9-9c37f8cee1d0.png',
        color: 'Black'
      }
    ];

    return (
      <div className="space-y-8" data-name="product-grid" data-file="components/ProductCard.js">
        {/* Product Grid - Strict 2 rows x 3 columns */}
        <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto">
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
    const [currentView, setCurrentView] = React.useState('front');
    const views = ['front', 'side', 'back'];

    const handleAddToCart = () => {
      if (selectedSize && !isCartFull) {
        onAddToCart({
          name: hoodie.name,
          size: selectedSize,
          color: hoodie.color,
          price: 4999
        });
        setSelectedSize('');
      }
    };

    const nextView = () => {
      const currentIndex = views.indexOf(currentView);
      const nextIndex = (currentIndex + 1) % views.length;
      setCurrentView(views[nextIndex]);
    };

    const canAddToCart = selectedSize && !isCartFull;

    return (
      <div className="premium-card" data-name="hoodie-card" data-file="components/ProductCard.js">
        {/* Hoodie Image with Navigation */}
        <div className="mb-4 relative">
          <img 
            src={hoodie.images[currentView]}
            alt={`${hoodie.name} ${currentView}`}
            className="w-full h-64 object-cover rounded-lg cursor-pointer"
            onClick={nextView}
          />
          <button
            onClick={nextView}
            className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <div className="icon-arrow-right text-sm"></div>
          </button>
          <div className="absolute bottom-2 left-2 flex space-x-1">
            {views.map(view => (
              <div
                key={view}
                className={`w-2 h-2 rounded-full ${view === currentView ? 'bg-[var(--luxury-gold)]' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{hoodie.color.toUpperCase()}</h3>
          <p className="text-lg font-bold text-[var(--luxury-gold)] mb-1">₹4,999</p>
          <p className="text-gray-300 text-xs">Limited Edition • Premium Cotton</p>
        </div>
        
        {/* Size Selection */}
        <div className="mb-4">
          <h4 className="text-white text-sm font-bold mb-3 text-center tracking-wide">SELECT SIZE</h4>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`size-button text-xs py-2 px-3 ${selectedSize === size ? 'selected' : ''}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className="add-to-cart-btn text-sm py-3"
        >
          {isCartFull ? 'CART FULL' : 
           !selectedSize ? 'SELECT SIZE' : 'ADD TO CART'}
        </button>
      </div>
    );
  } catch (error) {
    console.error('HoodieCard component error:', error);
    return null;
  }
}
