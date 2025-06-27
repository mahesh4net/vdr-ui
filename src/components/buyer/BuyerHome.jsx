import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";

const BuyerHome = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dealItem, setDealItem] = useState(null);
  const [showDealForm, setShowDealForm] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/items/all`);
        setItems(res.data);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error("Failed to load items:", err);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="buyer-home">
      <input
        type="text"
        placeholder="Search items by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="item-grid">
       {isLoading ? <Loader size={50} color={"white"} thickness={5}/> : !isLoading && filteredItems.length == 0 ? <p>no items found</p> : null}
        {filteredItems.map((item) => (
          <div
            className="item-card"
            key={item._id}
            onClick={() => {setSelectedItem(item); setDealItem(item)}}
          >
            <img src={item.imageUrl} alt={item.title} className="item-thumb" />
            <div className="item-details">
              <h3>{item.title}</h3>
              <p className="item-description">
                {item.description.slice(0, 200)}...
              </p>
              <p>
                <strong>₹{item.price}</strong>
              </p>
              <p className="seller-name">Seller: {item.seller.fullname}</p>
              <button
                className="primary-btn"
                onClick={(e) => {e.stopPropagation(); setDealItem(item); setShowDealForm(true)}}
              >
                Create Deal
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="item-preview-modal">
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <button className="cut-btn" onClick={() => setSelectedItem(null)}>
              x
            </button>
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title}
              className="preview-img"
            />
            <div className="preview-info">
              <h2>{selectedItem.title}</h2>
              <p className="item-description">{selectedItem.description}</p>
              <p>
                <strong>Price:</strong> ₹{selectedItem.price}
              </p>
              <p>
                <strong>Seller:</strong> {selectedItem.seller.fullname}
              </p>
              <button
                className="primary-btn"
                onClick={() => setShowDealForm(true) }
              >
                Create Deal
              </button>
            </div>
          </div>
        </div>
      )}

      {showDealForm && (
        <div className="item-preview-modal deal-preview-modal">
          <div className="preview-content deal-create-form" onClick={(e) => e.stopPropagation()}>
            <button className="cut-btn" onClick={() => setShowDealForm(false)}>
              ×
            </button>
            <div className="deal-info">
            <h2>Make an Offer</h2>
            <h4>Item: {dealItem?.title}</h4>
            <h4>Price: {dealItem?.price}</h4>
            </div>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="Enter your offer price"
              className="search-input"
            />
            <button
              className="primary-btn"
              onClick={async () => {
                try {
                  const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/deals/create`,
                    {
                      itemId: dealItem._id,
                      buyerOfferPrice: Number(offerPrice),
                    },
                    { withCredentials: true }
                  );
                  alert("Deal created successfully");
                  setShowDealForm(false);
                  setDealItem(null)
                  setOfferPrice("");
                } catch (err) {
                  console.error("Failed to create deal:", err);
                  alert(err.response?.data?.message || "Deal creation failed");
                }
              }}
            >
              Submit Offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;
