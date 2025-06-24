import { Routes, Route } from 'react-router-dom';
import BuyerSidebar from './BuyerSidebar';
import BuyerProfile from './BuyerProfile';
import BuyerDeals from './BuyerDeals';
import BuyerDealOverview from './BuyerDealOverview';
import BuyerDealsDetails from './BuyerDealsDetails';
import BuyerBuyHistory from './BuyerBuyHistory';

const BuyerDashboard = () => {
  return (
    <div className="dashboard-container">
      <BuyerSidebar />
      <div className="dashboard-content">
        <Routes>
          <Route index element={<BuyerProfile />} />
          <Route path="profile" element={<BuyerProfile />} />
          <Route path="deals" element={<BuyerDeals />} />
          <Route path="deals/:id" element={<BuyerDealsDetails/>} />
          <Route path="bought" element={<BuyerBuyHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default BuyerDashboard;
