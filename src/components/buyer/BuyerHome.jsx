import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../../../../server/models/Item";

const BuyerHome = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dealItem, setDealItem] = useState(null);
  const [showDealForm, setShowDealForm] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("/api/items/all");
        setItems(res.data);
      } catch (err) {
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
        {filteredItems.length === 0 && <p>No items found.</p>}
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
                    "/api/deals/create",
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
