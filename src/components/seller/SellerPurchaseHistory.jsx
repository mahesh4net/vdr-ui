import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../common/Loader';

const SellerPurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/payments/seller`, {
          withCredentials: true,
        });
        setLoading(fasle)
        setPurchases(res.data);
      } catch (err) {
        setLoading(false)
        console.error('Failed to load seller purchases', err);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Your Sales History</h2>
      {isLoading ? <Loader size={50} color={"white"} thickness={5}/> : !isLoading && purchases.length === 0 ? (
        <p>You haven't sold any items yet.</p>
      ) : (
        <div className="purchase-list">
          {purchases.map((entry) => (
            <div key={entry._id} className="purchase-card">
              <div className="purchase-details">
                <p><strong>Item:</strong> {entry.item?.title || 'item deleted'}</p>
                <p><strong>Buyer:</strong> {entry.buyer?.fullname} ({entry.buyer?.email})</p>
                <p><strong>Quantity:</strong> {entry.quantity}</p>
                <p><strong>Total Earned:</strong> ₹{entry.totalAmount}</p>
                {entry.deal?.buyerOfferPrice && (
                  <p><strong>Buyer Offer Price:</strong> ₹{entry.deal.buyerOfferPrice}</p>
                )}
                <p><strong>Date:</strong> {new Date(entry.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerPurchaseHistory;
