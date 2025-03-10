import React from "react";
import {createRoot} from "react-dom/client"
const root = createRoot(document.getElementById("root"))
root.render(
<>
 <Page/>
</>
);




 function Header(){
    return(
  <>
    <header className="header">
    <img src="/src/assets/react.svg" width={100}/>
    <ul className="nav-list">
          <li className="nav-items" >Pricing</li>
          <li className="nav-items">About</li>
          <li className="nav-items">Contact</li>
    </ul>
    </header>
  </>
    )
  }

function MainContent(){
  return(
  <>
   <h1>Hello world</h1>
   <ol>
    <li>My name is Yeboah Boanu Bernard and I am a Developer, who lives in Accra Ghana in west Africa </li>
    <li>I have A Diploma in Software Development and im planning adding more skills to them</li>
    <li>I am not happy because my girlfriend does not call me which is very sad Bro </li>
   </ol>
  </>
  )
}

function Footer(){
  return (
  <>
    <footer><span>my footer is this one </span></footer>
  </>

  )
}

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
