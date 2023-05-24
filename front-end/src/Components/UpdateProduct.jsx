import React, { useEffect, useState } from "react";
import "./UpdateProduct.css"; // Import the CSS file for styling
import { useParams,useNavigate } from "react-router-dom";


const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params =useParams();
  const navigate=useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);
  const getProductDetails = async ()=>{
    try {
      let result = await fetch(`http://localhost:6500/product/${params.id}`
      ,{ 
        headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }}
      )
      if (!result.ok) {
        throw new Error('Request failed with status: ' + result.status);
      }
      let data = await result.json();
      setName(data.name);
      setPrice(data.price);
      setCategory(data.category);
      setCompany(data.company);
      }catch (error) {
        console.error('Error in getProductDetails:', error);
        // Handle the error accordingly
      }
 
  
}
  
const updateProduct = async ()=>{
  try {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:6500/product/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        'Content-Type': "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    if (!result.ok) {
      throw new Error('Request failed with status: ' + result.status);
    }
    result = await result.json()
    console.warn(result)
    navigate('/products')
  } catch (error) {
    console.error('Error in updateProduct:', error);
    // Handle the error accordingly
  }
}
  
  const handleNameChange = (e) => {
    setName(e.target.value);

  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };
 
  
  // Repeat the same for handlePriceChange, handleCategoryChange, and handleCompanyChange
  

 
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct();
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
          className='inputBox'
            placeholder="Enter Product Name"
            value={name}
            onChange={handleNameChange}
            required
        
          />
        </div>
        <div>
          <input
            type="text"
            className='inputBox'
            placeholder="Enter Product Price"
        
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            className='inputBox'
            placeholder="Enter Product Category"
         
            value={category}
            onChange={handleCategoryChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Product Company"
            className='inputBox'
            value={company}
            onChange={handleCompanyChange}
            required
          />
        </div>
        <button onClick={updateProduct} type="submit">
          Update
        </button>
        </form>
    </div>
  );
};

export default UpdateProduct; 
