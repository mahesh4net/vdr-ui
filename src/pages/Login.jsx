import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });

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
        "https://virtual-deal-room-backend-5k9z.onrender.com/api/auth/login",
        form,
        { withCredentials: true }
      );
      dispatch(setUser(res.data.user));
      navigate("/");
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
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
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
          placeholder="Enter your password"
          onChange={handleChange}
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}
      </div>

      <button type="submit" className="primary-btn">
        Login
      </button>
    </form>
  </div>
);

};

export default Login;
