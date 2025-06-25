import { Link, useLocation } from 'react-router-dom';

const SellerSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);
 

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Seller Panel</h2>
      <Link to="/dashboard/profile" className={isActive('profile') ? 'active-link' : ''}>Profile</Link>
      <Link to="/dashboard/items" className={isActive('items') ? 'active-link' : ''}>Your Items</Link>
      <Link to="/dashboard/purchases" className={isActive('purchases') ? 'active-link' : ''}>Purchases</Link>

    </div>
  );
};

export default SellerSidebar;
