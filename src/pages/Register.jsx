import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      fullname: "",
      email: "",
      password: "",
      role: "",
    });
    try {
      const res = await axios.post(
        "https://virtual-deal-room-backend-5k9z.onrender.com/api/auth/register",
        form,
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert(err.response?.data?.message || "Registration failed");
      }
    }
  };

 return (
  <div className="auth-container">
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Enter your full name"
          onChange={handleChange}
        />
        {errors.fullname && <p className="error-msg">{errors.fullname}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Create a password"
          onChange={handleChange}
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="role">Account Type</label>
        <select name="role" id="role" onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        {errors.role && <p className="error-msg">{errors.role}</p>}
      </div>

      <button type="submit" className="primary-btn">
        Register
      </button>
    </form>
  </div>
);

};

export default Register;
