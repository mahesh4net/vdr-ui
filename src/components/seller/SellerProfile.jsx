import { useSelector } from 'react-redux';

const SellerProfile = () => {
  const { user } = useSelector((state) => state.user);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="dashboard-page">
      <h2>Your Profile</h2>
      <p><strong>Full Name:</strong> {user.fullname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default SellerProfile;

