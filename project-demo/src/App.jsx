import React from "react";
import {createRoot} from "react-dom/client"
const root = createRoot(document.getElementById("root"))
root.render(
  <>
    <img src="/src/assets/react.svg" width={100}/>
    <header><h1>Hello this is the header</h1></header>
    <ul>
      <li>list number one</li>
      <li>list number two</li>
      <li>list number three</li>
      <li>list number four</li>
    </ul>
    <footer><span>my footer is this one </span></footer>
  </>
   
    
);
export default App;
