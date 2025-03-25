import { createContext } from "react";
import p1 from "../assets/products/pro1.jpg";
import p2 from "../assets/products/p2.jpg"
import p3 from "../assets/products/p3.jpg"
import p4 from "../assets/products/p4.jpg"
import p5 from "../assets/products/p5.jpg"
import p6 from "../assets/products/p6.jpg"
import p7 from "../assets/products/p7.jpg"
import p8 from "../assets/products/p8.jpg"
import p9 from "../assets/products/p9.jpg"
import p10 from "../assets/products/p10.jpg"

import Trending from "../components/TrendingP";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₵';
    const delivery_fee = 10;
    const products = [
        { _id: 1, image: [p1], name: 'Product 1', price: 100 },
        { _id: 2, image: [p2], name: 'Product 2', price: 150 },
        { _id: 3, image: [p3], name: 'Product 3', price: 200 },
        { _id: 4, image: [p4], name: 'Product 4', price: 250 },
        { _id: 5, image: [p5], name: 'Product 5', price: 300 , trending: true },
        { _id: 6, image: [p6], name: 'Product 6', price: 300 , trending: true },
        { _id: 7, image: [p7], name: 'Product 7', price: 300 , trending: true },
        { _id: 8, image: [p8], name: 'Product 8', price: 300 , trending: true },
        { _id: 9, image: [p9], name: 'Product 9', price: 300 , trending: true },
        { _id: 10, image: [p10], name: 'Product 10', price: 300 , trending: true },
    ]; // Define your products array here

    const value = {
        products, currency, delivery_fee
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;