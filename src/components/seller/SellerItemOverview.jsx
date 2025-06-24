import { useEffect, useState } from 'react';
import axios from 'axios';

const SellerItemOverview = ({ itemId }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await axios.get(`/api/items/${itemId}`);
      setItem(res.data);
    };
    fetchItem();
  }, [itemId]);

  if (!item) return <p>Loading item...</p>;

  return (
    <div>
      <h2>{item.title}</h2>
      <img src={item.imageUrl} alt={item.title} className="preview-img" />
      <p>{item.description}</p>
      <p><strong>Price:</strong> ₹{item.price}</p>
    </div>
  );
};

export default SellerItemOverview;
