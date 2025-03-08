import { useState } from "react";
import FComponent from './components/fcomponent';
const App = () => {

 const [data,setx] = useState(0);

 const btnClick = () => {
  console.log("clicked");
  setx(x+1)
  console.log(x);
 }
  return(
   <div>
      {x}
     <button onClick={()=>{btnClick()}}>Click me</button>
     <fcomponent data={x} fn={setx}/>
    </div>
  )
}

export default App
