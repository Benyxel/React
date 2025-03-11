export default
function Header(){
    return(
  <>
    <header className="header">
    <img src="/src/assets/react.svg" />
    <ul className="nav-list">
          <li className="nav-items" ><a href="">Home</a></li>
          <li className="nav-items"> <a href="">About</a></li>
          <li className="nav-items"><a href="Contact.jsx">Contact</a></li>
    </ul>
    </header>
  </>
    )
  }