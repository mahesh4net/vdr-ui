import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../../redux/userSlice';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (!user) {
        try {
          const res = await axios.get('/api/auth/authenticate', { withCredentials: true });
          dispatch(setUser(res.data));
        } catch {
          setLoading(false);
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, [dispatch, user]);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
