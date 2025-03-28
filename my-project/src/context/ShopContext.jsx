import { createContext, use, useState } from "react";
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

    const [search, setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    

    const products = [
        { _id: 1, image: [p1], name: ' Mouse', price: 100, category: 'Gadget', type: 'Mouse' },
        { _id: 2, image: [p2], name: 'Droin', price: 150, category: 'Gadget', type: 'Droin' },
        { _id: 3, image: [p3], name: 'Mouse', price: 200, category: 'Gadget', type: 'Mouse' },
        { _id: 4, image: [p4], name: 'Product 4', price: 250, category: 'Gadget', type: 'Gadget' },
        { _id: 5, image: [p5], name: 'Phone', price: 300, category: 'Gadget', type: 'Phone', trending: true },
        { _id: 6, image: [p6], name: 'Product 6', price: 300, category: 'Gadget', type: 'Gadget', trending: true },
        { _id: 7, image: [p7], name: 'Product 7', price: 300, category: 'Kitchen', type: 'Kitchen', trending: true },
        { _id: 8, image: [p8], name: 'Footwear', price: 300, category: 'Wear', type: 'Footwear', trending: true },
        { _id: 9, image: [p9], name: 'Product 9', price: 300, category: 'Kitchen', type: 'Kitchen', trending: true },
        { _id: 10, image: [p10], name: 'Product 10', price: 300, category: 'Kitchen', type: 'Kitchen', trending: true },
    ]; // Define your products array here

    const value = {
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;