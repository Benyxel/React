import React from 'react'
import '../style/MovieCard.css'
import Star from "../assets/star.png"

const MovieCard = ({movie}) => {
  return (
      <a href={`https://www.themoviedb.org/movie/${movie.id}`} target='_blank' className='movie_card'>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='movie_poster' alt='movieposter'/>
          
          <div className='movie_details'>
              <h3 className='movie_d_heading'>{movie.original_title}</h3>
              <div className='movie_date_rate align_center'>
                  <p>{movie.release_date}</p>
                  <p>{movie.vote_average}<img src={Star} className='card_emoji' alt=''/></p>
              </div>
              <p className='movie_des'>{movie.overview.slice(0,100)+"..."}</p>
        </div>

    </a>
)
}

export default MovieCard