import { createContext } from "react";
import p1 from "../assets/products/pro1.jpg";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₵';
    const delivery_fee = 10;
    const products = [
        { _id: 1, image: [p1], name: 'Product 1', price: 100 },
        { _id: 2, image: [p1], name: 'Product 2', price: 150 },
        { _id: 3, image: [p1], name: 'Product 3', price: 200 },
        { _id: 4, image: [p1], name: 'Product 4', price: 250 },
        { _id: 5, image: [p1], name: 'Product 5', price: 300 },
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