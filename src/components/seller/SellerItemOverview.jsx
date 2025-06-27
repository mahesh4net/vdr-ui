import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../common/Loader';

const SellerItemOverview = ({ itemId }) => {
  const [item, setItem] = useState(null);
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/items/${itemId}`, { withCredentials: true });
      setLoading(false)
      setItem(res.data);
    };
    fetchItem();
  }, [itemId]);

  
  if (isLoading) return <Loader size={50} color={"white"} thickness={5}/>;
  if (!isLoading && !item) return <p>canot find item details</p>;

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
