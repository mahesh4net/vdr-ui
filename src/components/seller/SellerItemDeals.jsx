import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";

const SellerItemDeals = ({ itemId }) => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/deals/item/${itemId}`, {
          withCredentials: true,
        });
        setLoading(false)
        setDeals(res.data);
      } catch (err) {
        setLoading(false)
        console.error("Error loading deals:", err);
      }
    };

    fetchDeals();
  }, [itemId]);


  const handleStatusUpdate = async (dealId, newStatus) => {
  try {
    const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/deals/${dealId}`, {
      status: newStatus,
    }, { withCredentials: true });

    // Refresh deals after update
    setDeals((prev) =>
      prev.map((deal) =>
        deal._id === dealId ? { ...deal, status: res.data.status } : deal
      )
    );
  } catch (err) {
    alert('Failed to update deal status');
  }
};

const handleCounter = async (dealId) => {
  const newPrice = prompt('Enter your counter offer price (₹)');
  if (!newPrice || isNaN(newPrice)) return alert('Invalid price');

  try {
    const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/deals/${dealId}`, {
      sellerOfferPrice: Number(newPrice),
    }, { withCredentials: true });

    setDeals((prev) =>
      prev.map((deal) =>
        deal._id === dealId ? { ...deal, sellerOfferPrice: res.data.sellerOfferPrice } : deal
      )
    );
  } catch (err) {
    alert('Failed to update counter offer');
  }
};


  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>Deals for This Item</h2>
      {isLoading ? <Loader size={50} color={"white"} thickness={5}/> : !isLoading && deals.length === 0 ? (
        <p>No deals yet for this item.</p>
      ) : (
        <div className="deal-grid">
          {deals.map((deal) => (
            <div key={deal._id} className="deal-card">
              <div className="deal-header">
                <span>
                  <strong>Buyer:</strong> {deal.buyer.fullname}
                </span>
                <span>
                  <strong>Offer:</strong> ₹{deal.buyerOfferPrice}
                </span>
                <span>
                  <strong>Your Offer:</strong> ₹{deal.sellerOfferPrice}
                </span>
                <span>
                  <strong>Status:</strong> {deal.status}
                </span>
              </div>

              <div className="deal-body">
                {deal.status === "pending" && (
                  <>
                    <button
                      className="primary-btn"
                      onClick={() => handleStatusUpdate(deal._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="secondary-btn reject-btn"
                      onClick={() => handleStatusUpdate(deal._id, "rejected")}
                    >
                    Reject
                    </button>
                    <button
                      className="counter-btn secondary-btn"
                      onClick={() => handleCounter(deal._id)}
                    >
                      Counter
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
     </>
   
  );
};

export default SellerItemDeals;
