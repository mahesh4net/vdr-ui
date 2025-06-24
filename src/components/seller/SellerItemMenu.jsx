import { NavLink } from "react-router-dom";

export const SellerItemMenu = ({ itemId }) => {
  return (
    <div className="item-menu">
      <NavLink
        to={`/dashboard/item/${itemId}`}
        end
        className={({ isActive }) =>
          isActive ? "menu-link active" : "menu-link"
        }
      >
        Overview
      </NavLink>
      <NavLink
        to={`/dashboard/item/${itemId}/deals`}
        className={({ isActive }) =>
          isActive ? "menu-link active" : "menu-link"
        }
      >
        Deals
      </NavLink>
      <NavLink
        to={`/dashboard/item/${itemId}/purchases`}
        className={({ isActive }) =>
          isActive ? "menu-link active" : "menu-link"
        }
      >
        Purchases
      </NavLink>
      {/* <NavLink to="edit" className={({ isActive }) => (isActive ? 'menu-link active' : 'menu-link')}>Edit</NavLink>
      <NavLink to="delete" className={({ isActive }) => (isActive ? 'menu-link active' : 'menu-link')}>Delete</NavLink>
    */}
    </div>
  );
};
