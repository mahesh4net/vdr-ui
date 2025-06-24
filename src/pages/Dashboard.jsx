import { useSelector } from 'react-redux';
import BuyerDashboard from '../components/buyer/BuyerDashboard';
import SellerDashboard from '../components/seller/sellerDashboard';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  if (!user) return <p>Loading...</p>;

  return user.role === 'seller' ? <SellerDashboard /> : <BuyerDashboard />;
};

export default Dashboard;
