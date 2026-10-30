import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

const img = (keyword, n) => `https://loremflickr.com/400/300/${keyword}?lock=${n}`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', cost: '$15', description: 'Produces oxygen at night, improving air quality.' },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', cost: '$12', description: 'Filters formaldehyde and xylene.' },
      { name: 'Peace Lily', image: img('peacelily', 1), cost: '$18', description: 'Removes mold spores and purifies the air.' },
      { name: 'Boston Fern', image: img('fern', 2), cost: '$14', description: 'Natural humidifier that removes pollutants.' },
      { name: 'Rubber Plant', image: img('rubberplant', 3), cost: '$20', description: 'Absorbs airborne chemicals with large leaves.' },
      { name: 'Aloe Vera', image: img('aloevera', 4), cost: '$10', description: 'Purifies air and soothes burns and cuts.' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://cdn.pixabay.com/photo/2016/04/19/19/27/lavender-1339327_1280.jpg', cost: '$20', description: 'Calming scent, used in aromatherapy.' },
      { name: 'Jasmine', image: 'https://cdn.pixabay.com/photo/2017/03/13/19/04/jasmine-2140880_1280.jpg', cost: '$18', description: 'Sweet smell that promotes restful sleep.' },
      { name: 'Rosemary', image: img('rosemary', 5), cost: '$15', description: 'Invigorating scent, also a cooking herb.' },
      { name: 'Mint', image: img('mint', 6), cost: '$12', description: 'Refreshing aroma that repels pests.' },
      { name: 'Lemon Balm', image: img('lemonbalm', 7), cost: '$14', description: 'Lemon scent that reduces stress and anxiety.' },
      { name: 'Gardenia', image: img('gardenia', 8), cost: '$22', description: 'Rich, sweet fragrance with elegant white blooms.' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: img('zzplant', 9), cost: '$25', description: 'Thrives in low light and needs little water.' },
      { name: 'Pothos', image: img('pothos', 10), cost: '$13', description: 'Fast-growing vine that tolerates neglect.' },
      { name: 'Cast Iron Plant', image: img('aspidistra', 11), cost: '$24', description: 'Extremely hardy, survives dark corners.' },
      { name: 'Jade Plant', image: img('jadeplant', 12), cost: '$16', description: 'Succulent that stores water in its leaves.' },
      { name: 'Money Tree', image: img('moneytree', 13), cost: '$28', description: 'Easy-care plant believed to bring prosperity.' },
      { name: 'Cactus', image: img('cactus', 14), cost: '$9', description: 'Needs very little water and lots of sun.' },
    ],
  },
];

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);

  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useDispatch();

  const isInCart = (name) => cartItems.some(item => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const navBtn = { background: 'none', border: 'none', color: '#fff', marginRight: '20px', cursor: 'pointer', fontSize: '1rem' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#333', color: '#fff', alignItems: 'center' }}>
        <div onClick={() => { setShowCart(false); setShowAboutUs(false); }} style={{ cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}>
          Paradise Nursery
        </div>
        <div>
          <button onClick={() => { setShowCart(false); setShowAboutUs(false); }} style={navBtn}>Plants</button>
          <button onClick={() => { setShowAboutUs(true); setShowCart(false); }} style={navBtn}>About Us</button>
          <button onClick={() => { setShowCart(true); setShowAboutUs(false); }} style={{ ...navBtn, marginRight: 0 }}>
            🛒 Cart ({totalQuantity})
          </button>
        </div>
      </div>

      {showAboutUs ? (
        <AboutUs />
      ) : showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div style={{ padding: '30px' }}>
          {plantsArray.map((category, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h2>{category.category}</h2>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {category.plants.map((plant, pIndex) => (
                  <div key={pIndex} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '220px', background: '#fff' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
                    <h3>{plant.name}</h3>
                    <p style={{ fontWeight: 'bold', color: '#2e7d32' }}>{plant.cost}</p>
                    <p style={{ fontSize: '0.85rem', color: '#666' }}>{plant.description}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                      style={{
                        background: isInCart(plant.name) ? '#ccc' : '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        cursor: isInCart(plant.name) ? 'not-allowed' : 'pointer',
                        width: '100%',
                      }}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
