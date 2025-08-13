import React from 'react'
import "../style/NavBar.css"
import Fire from "../assets/fire.png"
import Star from "../assets/glowing-star.png"
import Party from "../assets/partying-face.png"

const NavBar = () => {
    return (
    <nav className='navbar'>
        <h1>MovieManiac</h1>

        <div className='navbar_links'>
                <a href=''>Popular <img className='link_emoji' src={Fire} alt='' /></a>
                <a href=''>Top Rated<img className='link_emoji'src={Star} alt='' /></a>
                <a href=''>Upcoming <img className='link_emoji' src={Party} alt=''/></a>
        </div>
    </nav>
    )
}

export default NavBar