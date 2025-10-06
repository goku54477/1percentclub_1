function ProductCard({ onAddToCart, cartCount, maxItems }) {
  try {
    const sizes = ['M', 'L', 'XL', 'XXL', 'XXXL'];
    // Order: Row 1: Turquoise Blue, Grey, Green; Row 2: Yellow, Red, Black
    const hoodies = [
      { 
        id: 'blue',
        name: '[ OB1 ]',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/blue1.jpg',
        color: 'Turquoise Blue'
      },
      { 
        id: 'grey',
        name: '[ GREY MATTER ]',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/grey1.jpg',
        color: 'Grey'
      },
      { 
        id: 'green',
        name: '[ GREEN GOBLIN ]',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/green1.jpg',
        color: 'Green'
      },
      { 
        id: 'yellow',
        name: '[ LEMONCHELLO ]',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/yellow1.jpg',
        color: 'Yellow'
      },
      { 
        id: 'red',
        name: '[ RED DRAGON ]',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/red1.jpg',
        color: 'Red'
      },
      { 
        id: 'black',
        name: '[ VENOM ]',
        image: 'https://raw.githubusercontent.com/goku54477/1percentclub_1/ea35a98d515bc61ba55361ce23d48cfa3231cc64/black1.jpg',
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
        {/* Hoodie Image with light background - Full model display without cropping */}
        <div className="mb-5 w-full bg-white rounded overflow-hidden" style={{aspectRatio: '3/4'}}>
          <img 
            src={hoodie.image}
            alt={hoodie.name}
            className="w-full h-full object-cover object-top"
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
