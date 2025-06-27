import { useEffect, useState } from "react";
import axios from "axios";
import DummyPayment from "./DummyPayment";
import Loader from "../common/Loader";

const BuyerDealOverview = ({ DealID }) => {
  const [item, setItem] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isLoading, setLoading] = useState(false)
  
  const handlePaySuccess = () => {
    setSelectedDeal(null);
    setItem({ ...selectedDeal, status: 'completed' });
  };

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/deals/deal/${DealID}`, {withCredentials: true});
     setLoading(false)
      setItem(res.data);
    };
    fetchItem();
  }, [DealID]);

  if (isLoading) return <Loader size={50} color={"white"} thickness={5}/>;
  if (!isLoading && !item) return <p>canot find deal details</p>;

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
