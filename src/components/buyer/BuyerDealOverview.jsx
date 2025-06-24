import { useEffect, useState } from "react";
import axios from "axios";
import DummyPayment from "./DummyPayment";

const BuyerDealOverview = ({ DealID }) => {
  const [item, setItem] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  
  const handlePaySuccess = () => {
    setSelectedDeal(null);
    setItem({ ...selectedDeal, status: 'completed' });
  };

  useEffect(() => {
    const fetchItem = async () => {
      const res = await axios.get(`https://virtual-deal-room-backend-5k9z.onrender.com/api/deals/deal/${DealID}`);
      console.log(res.data);
      setItem(res.data);
    };
    fetchItem();
  }, [DealID]);

  if (!item) return <p>Loading item...</p>;

  return (
    <div>
      <h2>{item.item.title}</h2>
      <img
        src={item.item.imageUrl}
        alt={item.item.title}
        className="preview-img"
      />
      <p>{item.item.description}</p>
      <p>
        <strong>Owner offer:</strong> ₹{item.sellerOfferPrice}
      </p>
      <p>
        <strong>Your offer:</strong> ₹{item.buyerOfferPrice}
      </p>
     <p>
  <strong>Status:</strong>{" "}
  <span
    className={
      item.status === "accepted" || item.status === "completed"
        ? "accepted"
        : item.status === "rejected"
        ? "rejected"
        : "pending"
    }
  >
    {item.status}
  </span>
</p>


      {item.status === "accepted" && (
        <button className="primary-btn" onClick={() => setSelectedDeal(item)}>
          Pay Now
        </button>
      )}

      {selectedDeal && (
        <DummyPayment
          deal={selectedDeal}
         setSelectedDeal={setSelectedDeal}
          onClose={() => setSelectedDeal(null)}
          onPay={handlePaySuccess}
        />
      )}
    </div>
  );
};

export default BuyerDealOverview;
