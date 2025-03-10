import React from "react";
import {createRoot} from "react-dom/client"
const root = createRoot(document.getElementById("root"))
root.render(
  <main>
     <img src="/src/assets/react.svg" width={100}/>
    <h1>Hello are you there</h1>
    <ul>
      <li>list number one</li>
      <li>list number two</li>
      <li>list number three</li>
      <li>list number four</li>
    </ul>
  </main>
   
    
);
export default App;
