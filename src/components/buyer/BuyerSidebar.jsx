import { Link, useLocation } from 'react-router-dom';

const BuyerSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Buyer Panel</h2>
      <Link to="/dashboard/profile" className={isActive('profile') ? 'active-link' : ''}>Profile</Link>
      <Link to="/dashboard/deals" className={isActive('deals') ? 'active-link' : ''}>Your Deals</Link>
      <Link to="/dashboard/bought" className={isActive('bought') ? 'active-link' : ''}>Buy History</Link>

    </div>
  );
};

export default BuyerSidebar;
