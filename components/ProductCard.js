function ProductCard({ onAddToCart, cartCount, maxItems }) {
  try {
    const sizes = ['M', 'L', 'XL', 'XXL', 'XXXL'];
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
      <div className="w-full" data-name="product-grid" data-file="components/ProductCard.js">
        {/* Product Grid - Strict 2 rows x 3 columns with tight spacing */}
        <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
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
        {/* Hoodie Image with light background */}
        <div className="mb-5 w-full bg-gray-100 rounded overflow-hidden">
          <img 
            src={hoodie.image}
            alt={hoodie.name}
            className="w-full h-auto object-contain"
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
