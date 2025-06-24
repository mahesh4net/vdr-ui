import { useSelector } from 'react-redux';
import BuyerHome from '../components/buyer/BuyerHome';
import SellerHome from '../components/seller/SellerHome';
import DefaultHome from '../components/common/DefaultHome';

const Home = () => {
  const { user } = useSelector((state) => state.user);

  if (!user) return <DefaultHome />

  return user.role === 'buyer' ? <BuyerHome /> : <SellerHome />;
};

export default Home;
