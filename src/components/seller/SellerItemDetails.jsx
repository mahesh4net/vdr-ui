import { useParams, Routes, Route } from 'react-router-dom';
import { SellerItemMenu } from './SellerItemMenu';
import SellerItemOverview from './SellerItemOverview';
import SellerItemDeals from './SellerItemDeals';
import SellerItemPurchases from './SellerItemPurchases';

const SellerItemDetails = () => {
  const { id } = useParams();

  return (     
    <div className="dashboard-page">
      <SellerItemMenu itemId={id} />

      <Routes>
        <Route index element={<SellerItemOverview itemId={id} />} />
        <Route path="deals" element={<SellerItemDeals itemId={id} />} />
         <Route path="purchases" element={<SellerItemPurchases itemId={id} />} />
      </Routes>
    </div>
  );
};

export default SellerItemDetails;
