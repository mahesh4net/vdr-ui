import axios from 'axios';
import { useState, useEffect } from 'react';

const DummyPayment = ({ deal, onClose, onPay }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cvv, setCvv] = useState('');

const total = quantity * deal.buyerOfferPrice;

  
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!address || !mobile || !cardNumber || !cardExpiry || !cvv) {
    alert('Please fill all fields');
    return;
  }

  try {
    const res = await axios.patch(`/api/deals/${deal._id}/pay`, {
      quantity,
      address,
      mobile,
    }, { withCredentials: true });

    alert('Payment successful!');
    onPay();
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'Payment failed.');
  }
};

  return (
    <div className="payment-overlay">
      <div className="payment-modal">
        <button className="cut-btn" onClick={onClose}>×</button>
        <h2>Complete Your Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item:</label>
            <p>{deal.item.title}</p>
          </div>

          <div className="form-group">
            <label>Price per Unit:</label>
            <p>₹{deal.buyerOfferPrice}</p>

          </div>

          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Total Price:</label>
            <p><strong>₹{total}</strong></p>
          </div>

          <div className="form-group">
            <label>Address:</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Mobile Number:</label>
            <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </div>

          <hr style={{ margin: '20px 0', borderColor: '#444' }} />

          <div className="form-group">
            <label>Card Number:</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
          </div>

          <div className="form-inline">
            <div className="form-group">
              <label>Expiry:</label>
              <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>CVV:</label>
              <input type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
            </div>
          </div>

          <button className="primary-btn" type="submit">
            Pay ₹{total}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DummyPayment;
