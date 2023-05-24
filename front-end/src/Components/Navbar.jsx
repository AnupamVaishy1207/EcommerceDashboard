
import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  const auth=localStorage.getItem('user');
  const navigate = useNavigate();
  const logout=()=>{
localStorage.clear();
navigate('/signup')
  }
  return (
    <div className="navbar">
      <div className="navbar-logo">CyberMarket</div>
      <input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
      <label htmlFor="navbar-toggle" className="navbar-toggle-label">
        <span className="navbar-toggle-icon"></span>
      </label>
      <div className="navbar-menu ">
      { auth ? <ul className="navbar-ul">
         
          <li><Link to="/">Home </Link></li>
          <li><Link to="/products">Products </Link></li>
          <li><Link to="/add">Add Product </Link></li>
          <li><Link to="/update/:id">Update Product </Link></li>
          <li><Link to="/profile">Profile </Link></li>
          <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})  </Link></li>
        </ul>
        :
        <ul className="navbar-ul">
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login </Link></li></ul>
 } </div>
    </div>
  );
}

export default Navbar;
