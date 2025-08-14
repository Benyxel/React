import React from 'react'
import '../style/MovieCard.css'
import Star from "../assets/star.png"

const MovieCard = () => {
  return (
      <a href='' className='movie_card'>
          <img src='https://creativereview.imgix.net/content/uploads/2023/12/Oppenheimer.jpg?auto=compress,format&q=60&w=1263&h=2000' className='movie_poster' alt='movieposter' />
          
          <div className='movie_details'>
              <h3 className='movie_d_heading'>Movie Name</h3>
              <div className='movie_date_rate align_center'>
                  <p>10-20-2025</p>
                  <p>8.0 <img src={Star} className='card_emoji' alt=''/></p>
              </div>
              <p className='movie_des'>Five years post-Jurassic World: Dominion (2022), an expedition braves isolated equatorial regions to extract DNA from three massive prehistoric creatures for a groundbreaking medical breakthrough.</p>
        </div>

    </a>
  )
}

export default MovieCard