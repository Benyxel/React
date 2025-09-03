import React from "react";
import Header from "./components/Header";
import "./HomePage.css";
import axios from "axios";
import { useEffect, useState } from "react";

import ProductsGrid from "./components/ProductsGrid";

const HomePage = ({ cart }) => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProduct(response.data);
    });
  }, []);

  return (
    <>
      <title>Ecommerce</title>

      <Header title="Order" cart={cart} />

      <div className="home-page">
       <ProductsGrid products={products}/>
      </div>
    </>
  );
};

export default HomePage;
