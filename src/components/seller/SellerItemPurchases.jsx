import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";

const SellerItemPurchases = ({ itemId }) => {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments/item/${itemId}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setPurchases(res.data);
    };
    fetchPurchases();
  }, [itemId]);

  return (
    <div className="dashboard-page">
      <h2>Purchases</h2>
      {isLoading ? (
        <Loader size={50} color={"white"} thickness={5} />
      ) : !isLoading && purchases.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        purchases.map((p) => (
          <div key={p._id} className="seller-purchase-card">
            <p>
              <strong>Buyer:</strong> {p.buyer.fullname} ({p.buyer.email})
            </p>
            <p>
              <strong>Quantity:</strong> {p.quantity}
            </p>
            <p>
              <strong>Final price:</strong> ₹{p.deal.buyerOfferPrice}
            </p>
            <p>
              <strong>Total Paid:</strong> ₹{p.totalAmount}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(p.createdAt).toLocaleDateString()}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default SellerItemPurchases;
