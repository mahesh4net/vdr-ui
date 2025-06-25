import { Routes, Route, useLocation } from 'react-router-dom';
import SellerSidebar from './SellerSidebar';
import SellerProfile from './SellerProfile';
import SellerItems from './SellerItems';
import SellerItemDetails from './SellerItemDetails';
import SellerPurchaseHistory from './SellerPurchaseHistory';


const SellerDashboard = () => {
  const location = useLocation();
  const isItemDetailsPage = location.pathname.includes('/dashboard/item/');




  return (
    <div className="dashboard-container">

      {/* Only show main sidebar if NOT on item details page */}
      {!isItemDetailsPage && <SellerSidebar />}
      
      
      <div className="dashboard-content">
        <Routes>
          <Route index element={<SellerProfile />} />
          <Route path="profile" element={<SellerProfile />} />
          <Route path="items" element={<SellerItems />} />
          <Route path="item/:id/*" element={<SellerItemDetails />} />
          <Route path="purchases" element={<SellerPurchaseHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default SellerDashboard;
