import React from "react";
import {createRoot} from "react-dom/client"
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

const root = createRoot(document.getElementById("root"))
root.render(
<>
 <Page/>
</>
);

function Page(){
  return (
    <>
    <Header/>
    
    <MainContent/>
    <Footer/>
    </>
  )
}

export default App;
