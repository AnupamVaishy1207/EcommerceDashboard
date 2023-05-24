
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';
import Home from './Components/Home';
import Profile from './Components/Profile';
function App() {
  return (
    <div className="App">
    
      <BrowserRouter > 
      <Navbar />
   <Routes>
<Route element={<PrivateComponent />}>
    <Route path="/" element={<Home />}/>
    <Route path="/add" element={<AddProduct />}/>
    <Route path="/products" element={<ProductList />}/>
    <Route path="/update/:id" element={<UpdateProduct />}/>
    <Route path="/logout" element={<h1> Logout Product Component</h1>}/>
    <Route path="/profile" element={<h1> <Profile/></h1>}/>
    </Route>
  < Route path="/signup" element={<Signup />} />
  < Route path="/login" element={<Login />} />
   
   </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  );
}

export default App;
