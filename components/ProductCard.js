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

    const handleRequestAccess = () => {
      if (selectedSize && !isCartFull) {
        onAddToCart({
          name: hoodie.name,
          size: selectedSize,
          color: hoodie.color,
          price: 2899
        });
        setSelectedSize('');
      }
    };

    return (
      <div className="text-center" data-name="hoodie-card" data-file="components/ProductCard.js">
        {/* Hoodie Image */}
        <div className="mb-6">
          <img 
            src={hoodie.image}
            alt={hoodie.name}
            className="w-full h-auto object-contain"
          />
        </div>
        
        {/* Product Info - Centered and Stacked */}
        <div className="flex flex-col items-center space-y-3">
          {/* Product Name */}
          <h3 className="text-xl font-normal text-white tracking-wide">{hoodie.name}</h3>
          
          {/* Limited Stock Text */}
          <p className="text-sm text-gray-300">1 of 30 Only</p>
          
          {/* Price */}
          <p className="text-lg font-normal text-white">₹2,899</p>
          
          {/* Size Options */}
          <div className="flex justify-center gap-3">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border px-4 py-2 text-sm font-normal transition-all ${
                  selectedSize === size 
                    ? 'border-white bg-white text-black' 
                    : 'border-gray-600 bg-transparent text-white hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          
          {/* Request Access Button */}
          <button
            onClick={handleRequestAccess}
            disabled={!selectedSize || isCartFull}
            className="mt-2 px-8 py-3 bg-white text-black font-normal text-sm uppercase tracking-wide hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Request Access
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('HoodieCard component error:', error);
    return null;
  }
}
