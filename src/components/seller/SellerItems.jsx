import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerItems = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/items/mine`, { withCredentials: true });
      setItems(res.data);
    };
    fetchItems();
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Your Listed Items</h2>
      {items.length === 0 && <p>You haven't listed any items yet.</p>}
      <div className="item-grid">
        {items.map((item) => (
          <div key={item._id} className="item-card" onClick={() => navigate(`/dashboard/item/${item._id}`)}>
            <img src={item.imageUrl} alt={item.title} className="item-thumb" />
            <div className="item-details">
              <h3>{item.title}</h3>
              <p className="item-description">{item.description.slice(0, 200)}...</p>
              <p><strong>₹{item.price}</strong></p>
              <button
                className="primary-btn"
                onClick={() => navigate(`/dashboard/item/${item._id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerItems;
