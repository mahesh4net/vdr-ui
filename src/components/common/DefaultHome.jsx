import { Link } from 'react-router-dom';

const DefaultHome = () => {
  return (
    <div className="default-home">
      <div className="hero-box">
        <h1 className="main-title">Welcome to VDR.</h1>
        <p className="tagline">
          Where Buyers and Sellers connect, negotiate, and close deals in real-time.
        </p>
        <div className="home-buttons">
          <Link to="/login">
            <button className="primary-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="secondary-btn">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DefaultHome;
