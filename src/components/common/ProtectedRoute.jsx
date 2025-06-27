import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../redux/userSlice";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (!user) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/authenticate`,
            { withCredentials: true }
          );
          dispatch(setUser(res.data));
          setLoading(false);
        } catch {
          setLoading(false);
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, [dispatch, user]);

  if (isloading) return <Loader size={80} color={"white"} thickness={5}  />;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
