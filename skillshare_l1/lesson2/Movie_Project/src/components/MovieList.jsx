import React, { useEffect } from 'react'
import "../style/MovieList.css"
import Fire from "../assets/fire.png"
import MovieCard from './MovieCard'

const MovieList = () => {

    useEffect(() => {
    fetchMovies()
    
}, [])

    const fetchMovies = async () => {
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=400c4125f742cd7c391ae48539f41acd")
    
        const data = await response.json()
        console.log(data)
    }

return (
<section className='movie_list'>
    <header className='movie_list_header align_center'>
        <h2 className='movie_list_heading align_center'>Popular <img className='link_emoji' src={Fire} alt='' /> </h2>
        
        <div className='movie_list_fs align_center'>
            <ul className='movie_filter align_center'>
                <li className='movie_filter_item active'>8+ Star</li>
                <li className='movie_filter_item'>7+ Star</li>
                <li className='movie_filter_item'>6+ Star</li>

            </ul>

            <select name='' id='' className='movie_sorting'> 
                <option value='' key=''>SortBy </option>
                <option value='' key=''>Date </option>
                <option value='' key=''>Rating </option>
            </select>

            <select name='' id='' className='movie_sorting'> 
                <option value='' key=''>Accending </option>
                <option value='' key=''>Decending </option>
            </select>
        </div>
        </header>    
        
        <div className='movie_cards'>
            <MovieCard />

        </div>

</section>
)
}

export default MovieList