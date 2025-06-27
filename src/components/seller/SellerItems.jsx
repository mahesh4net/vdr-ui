import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";

const SellerItems = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/items/mine`,
        { withCredentials: true }
      );
      setLoading(false);
      setItems(res.data);
    };
    fetchItems();
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Your Listed Items</h2>
      <div className="item-grid">
        {isLoading ? (
          <Loader size={50} color="white" thickness={5} />
        ) : items && items.length > 0 ? (
          items.map((item) => (
            <div
              key={item._id}
              className="item-card"
              onClick={() => navigate(`/dashboard/item/${item._id}`)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="item-thumb"
              />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p className="item-description">
                  {item.description.slice(0, 200)}...
                </p>
                <p>
                  <strong>₹{item.price}</strong>
                </p>
                <button
                  className="primary-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent div click
                    navigate(`/dashboard/item/${item._id}`);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default SellerItems;
