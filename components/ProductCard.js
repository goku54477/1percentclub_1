function ProductCard({ onAddToCart, cartCount, maxItems }) {
  try {
    const sizes = ['M', 'L', 'XL', 'XXL', 'XXXL'];
    const hoodies = [
      { 
        id: 'black',
        name: 'Jet Black Premium Hoodie',
        images: {
          front: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/15f4b7fc-56b6-440d-a8a9-9c37f8cee1d0.png',
          side: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/ff8b8c97-b7dd-4144-866f-75fe0c847530.png',
          back: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/c2fd11dd-593f-49a0-83d5-b74473a4f04e.png'
        },
        color: 'Jet Black'
      },
      { 
        id: 'red',
        name: 'Crimson Red Premium Hoodie',
        images: {
          front: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/94e05891-922a-4cb6-b136-83dc03d915df.png',
          side: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/9e4d735d-6ee6-45f9-b5c7-65ab1cd70e81.png',
          back: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/41dc6400-e8fe-4cfd-9806-d437fbf7bc1e.png'
        },
        color: 'Crimson Red'
      },
      { 
        id: 'yellow',
        name: 'Broom Yellow Premium Hoodie',
        images: {
          front: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/6cb4dc1e-f371-464e-a857-1eb8b15bf359.png',
          side: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/da1c824b-d1bc-44bf-b2fe-d1a840d5759f.png',
          back: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/d01e3496-c3ef-43f3-9274-becd576e8e34.png'
        },
        color: 'Broom Yellow'
      },
      { 
        id: 'green',
        name: 'Niagra Green Premium Hoodie',
        images: {
          front: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/78a821ed-c299-48d5-bec5-c81318c4840c.png',
          side: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/3ba39a30-24de-41e8-9551-501f526dcec6.png',
          back: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/b9411765-46c0-417a-83d3-e206d2b19ed7.png'
        },
        color: 'Niagra Green'
      },
      { 
        id: 'grey',
        name: 'Quil Grey Premium Hoodie',
        images: {
          front: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/02643f26-a168-44d2-9060-1e1bc0dc0aba.png',
          side: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/4534a926-7462-4832-b332-c80e3de77cea.png',
          back: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/5ed046d0-64ff-49d7-9ac8-a0aa59090fab.png'
        },
        color: 'Quil Grey'
      },
      { 
        id: 'blue',
        name: 'Curious Blue Premium Hoodie',
        images: {
          front: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/040f64df-649f-46b7-a1d0-8813528485cf.png',
          side: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/145f7f62-db14-4c31-b1c0-980f15951a1f.png',
          back: 'https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/177048a3-7bf9-44d0-9d00-ad2f4d52e907.png'
        },
        color: 'Curious Blue'
      }
    ];

    return (
      <div className="space-y-8" data-name="product-grid" data-file="components/ProductCard.js">
        {/* Limit Notice */}
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm mb-2">Maximum 3 hoodies per person</p>
          <div className="flex justify-center items-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(maxItems)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full ${i < cartCount ? 'bg-[var(--luxury-gold)]' : 'bg-gray-600'}`}
                />
              ))}
            </div>
            <span className="text-[var(--luxury-gold)] text-sm font-semibold">{cartCount}/{maxItems}</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
