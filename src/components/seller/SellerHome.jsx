import { useState } from 'react';
import axios from 'axios';

const SellerHome = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please upload an image');
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/items/create`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
      setForm({ title: '', description: '', price: '' });
      setImage(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seller-home">
      <h2>List a New Item</h2>
      <form className="item-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Item Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price (₹)" value={form.price} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImage} required />
        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Create Item'}
        </button>
        {success && <p style={{ color: 'green' }}>Item listed successfully!</p>}
      </form>
    </div>
  );
};

export default SellerHome;
