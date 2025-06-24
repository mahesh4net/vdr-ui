import { NavLink } from "react-router-dom";

export const BuyerDealMenu = ({ DealID }) => {
  return (
    <div className="item-menu">
      <NavLink
        to={`/dashboard/deals/${DealID}`}
        end
        className={({ isActive }) =>
          isActive ? "menu-link active" : "menu-link"
        }
      >
        Overview
      </NavLink>
    </div>
  );
};
