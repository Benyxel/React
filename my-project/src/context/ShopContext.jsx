import { createContext } from "react";
import App from "../App";

export const ShopContext = createContext();

const shopContextProvider = () =>{
    const currency = '₵'
    const delivery_fee = 10;
    


    const value = {
        products, currency, delivery_fee
    }

    return(
        <ShopContext.Provider value={value}>
            {prop.children}
        </ShopContext.Provider>
    )
}

export default shopContextProvider;