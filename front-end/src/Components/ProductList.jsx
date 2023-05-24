import React, { useEffect, useState } from "react";
import "./ProductList.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let response = await fetch("http://localhost:6500/all-product", {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      let result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error in getProducts:", error);
      // Handle the error accordingly
    }
  };

  const deleteProduct = async (id) => {
    try {
      let response = await fetch(`http://localhost:6500/product/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      let result = await response.json();
      if (result) {
        getProducts();
      }
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      // Handle the error accordingly
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      try {
        let response = await fetch(`http://localhost:6500/product/${key}`, {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });

        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }

        let result = await response.json();
        if (result) {
          setProducts(result);
        }
      } catch (error) {
        console.error("Error in searchHandle:", error);
        // Handle the error accordingly
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>productList</h3>
      <input type="text"placeholder="Search Product" onChange={searchHandle}/>
      <ul>
        <li>S. No </li>
        <li>Name </li>
        <li>Price </li>
        <li>Category </li>
        <li>Operation </li>
      </ul>
   {
  products.length>0 ? products.map((item,index)=>
        <ul key={item._id}>
        <li>{index+1} </li>
        <li>{item.name}</li>
        <li>$ {item.price}</li>
        <li>{item.category} </li>
        <li>
          <button className="Deletebtn" onClick={async ()=>await deleteProduct(item._id)}>Delete</button>
          <Link to={"/update/"+item.id}>Update</Link>
          </li>
      </ul>
    ): <h1>No Result found</h1>
   }
    </div>
  );
};

export default ProductList;
