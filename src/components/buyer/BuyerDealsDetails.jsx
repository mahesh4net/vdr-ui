import { useParams, Routes, Route } from "react-router-dom";

import { BuyerDealMenu } from "./BuyerDealMenu";
import BuyerDealOverview from "./BuyerDealOverview";

const BuyerDealsDetails = () => {
  const { id } = useParams();

  console.log(id, "deal id");

  return (
    <div className="dashboard-page">
      <BuyerDealMenu DealID={id} />
      <Routes>
        <Route index element={<BuyerDealOverview DealID={id} />} />
      </Routes>
     
    </div>
  );
};

export default BuyerDealsDetails;
