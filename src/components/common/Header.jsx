import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../redux/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.post("https://virtual-deal-room-backend-5k9z.onrender.com/api/auth/logout", {}, { withCredentials: true });
      dispatch(clearUser());
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };
  return (
    <header className="vdr-header">
      <div className="vdr-logo">
        <Link to="/">Virtual Deal Room</Link>
      </div>
      <nav>
        {!user ? (
          <>
            {" "}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <button className="primary-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <Link to={'/dashboard'} className="secondary-btn">
              Dashboard
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
