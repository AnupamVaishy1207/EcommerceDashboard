import React, { useState } from "react";
import "./AddProduct.css"; // Import the CSS file for styling


const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  
 const addProduct = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      let response = await fetch("http://localhost:6500/add-product", {
        method: "POST",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      let result = await response.json();
      console.warn(result);
    } catch (error) {
      console.error("Error in addProduct:", error);
      // Handle the error accordingly
    }
  };


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
    // Handle form submission here
    // You can use the form data (name, price, category, company) for further processing or API calls
    console.log(name, price, category, company);
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            placeholder="Enter Product Name"
            value={name}
            onChange={handleNameChange}
            required
        
          />
     
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Product Price"
            id="price"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Product Category"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Product Company"
            id="company"
            value={company}
            onChange={handleCompanyChange}
            required
          />
        </div>
        <button onClick={addProduct} type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
