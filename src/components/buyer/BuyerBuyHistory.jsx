import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../common/Loader';

const BuyerBuyHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/payments/buyer`, { withCredentials: true });
        setLoading(false)
        setHistory(res.data);

      } catch (err) {
        setLoading(false)
        console.error('Failed to load buy history', err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Your Bought Items</h2>
      {isLoading ? <Loader size={50} color={"white"} thickness={5}/> : !isLoading && history.length === 0 ? (
        <p>You haven't bought anything yet.</p>
      ) : (
        <div className="purchase-list">
          {history.map((entry) => (
            <div key={entry._id} className="purchase-card">
              <img
                src={entry.item?.imageUrl}
                alt={entry.item?.title || 'item deleted'}
                className="purchase-img"
              />
              <div className="purchase-info">
                <p><strong>Item:</strong> {entry.item?.title || 'item deleted'}</p>
                <p><strong>Quantity:</strong> {entry.quantity}</p>
                <p><strong>Total Paid:</strong> ₹{entry.totalAmount}</p>
                <p><strong>Date:</strong> {new Date(entry.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerBuyHistory;
