import React from 'react';
import './Profile.css'; // Import the CSS file 
import {  useNavigate} from 'react-router-dom';
const Profile = ({ name }) => {
    const auth=localStorage.getItem('user');
    const navigate = useNavigate();
    const logout=()=>{
  localStorage.clear();
  navigate('/signup')
    }
  return (
    <div className="profile-container">
      <div className="profile-info">
      <h2>Welcome, {JSON.parse(auth).name}!</h2>
      <p>This is your profile page.</p>
      <p>Email: {JSON.parse(auth).email}</p>
    
      {/* Add more profile information or functionality here */}
      <div className="profile-logout">
        <button onClick={logout} to="/signup">Logout</button>
      </div>
      </div>
    </div>
  );
};

export default Profile;
