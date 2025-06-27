import { useEffect, useState } from "react";
import axios from "axios";
import DummyPayment from "./DummyPayment"; // Make sure it's correctly imported
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";

const BuyerDeals = () => {
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handlePaySuccess = () => {
    setDeals((deals) =>
      deals.map((deal) =>
        deal._id === selectedDeal._id ? { ...deal, status: "completed" } : deal
      )
    );
    setSelectedDeal(null);
  };

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/deals/buyer`, {
          withCredentials: true,
        });
      
        setDeals(res.data);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error("Failed to load deals", err);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Your Deals</h2>

      {isLoading ? <Loader size={50} color={"white"} thickness={5}/> : deals.length === 0 && !isLoading ?  (
        <p>You haven't made any deals yet.</p>
      ) : (
        <div className="buyer-deal-list">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="buyer-deal-card"
              onClick={() => navigate(`/dashboard/deals/${deal._id}`)}
            >
              <div className="buyer-deal-left">
                <img
                  src={deal.item?.imageUrl}
                  alt={deal.item?.title || 'item deleted'}
                  className="buyer-deal-img"
                />
              </div>
              <div className="buyer-deal-right">
                <p>
                  <strong>Item:</strong> {deal.item?.title || 'deleted'}
                </p>
                <p>
                  <strong>Your Offer:</strong> ₹{deal.buyerOfferPrice}
                </p>
                <p>
                  <strong>Seller Offer:</strong> ₹{deal.sellerOfferPrice}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      deal.status === "accepted" || deal.status === "completed"
                        ? "accepted"
                        : deal.status === "rejected"
                        ? "rejected"
                        : "pending"
                    }
                  >
                    {deal.status}
                  </span>
                </p>

                {deal.status === "pending" && (
                  <button
                    className="secondary-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newOffer = prompt(
                        "Enter your new offer price (₹):",
                        deal.buyerOfferPrice
                      );
                      if (!newOffer) return;
                      if (isNaN(newOffer) || newOffer <= 0) {
                        alert("Please enter a valid price.");
                        return;
                      }

                      axios
                        .patch(
                          `${import.meta.env.VITE_BACKEND_URL}/api/deals/buyer/${deal._id}`,
                          { buyerOfferPrice: newOffer },
                          { withCredentials: true }
                        )
                        .then((res) => {
                          alert("Offer updated successfully!");
                          setDeals((prev) =>
                            prev.map((d) =>
                              d._id === deal._id
                                ? { ...d, buyerOfferPrice: newOffer }
                                : d
                            )
                          );
                        })
                        .catch((err) => {
                          alert("Failed to update offer");
                          console.error(err);
                        });
                    }}
                  >
                    Negotiate
                  </button>
                )}

                {deal.status === "accepted" && (
                  <button
                    className="primary-btn"
                    onClick={(e) => {setSelectedDeal(deal); e.stopPropagation()}}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}

          {selectedDeal && (
            <DummyPayment
              deal={selectedDeal}
              onClose={() => setSelectedDeal(null)}
              onPay={handlePaySuccess}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BuyerDeals;
