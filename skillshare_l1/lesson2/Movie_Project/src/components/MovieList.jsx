import React, { useEffect, useState } from 'react'
import "../style/MovieList.css"
import Fire from "../assets/fire.png"
import MovieCard from './MovieCard'
import Rating from './Rating'

const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [filterMovies, setFilterMovies] = useState([])
    const [rating, setRating] = useState(0)

    useEffect(() => {
    fetchMovies()
    
}, [])

    const fetchMovies = async () => {
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=400c4125f742cd7c391ae48539f41acd")
    
        const data = await response.json()
        setMovies(data.results)
        setFilterMovies(data.results)
    }

    const handleFilter = rate => {
        
        if (rate === rating) {
            setRating(0)
            setFilterMovies(movies)
        } else {
            setRating(rate)
        
        const filtered = movies.filter(movie => movie.vote_average >= rate)
        setFilterMovies(filtered)
        }
    }

return (
<section className='movie_list'>
    <header className='movie_list_header align_center'>
        <h2 className='movie_list_heading align_center'>Popular <img className='link_emoji' src={Fire} alt='' /> </h2>
        
        <div className='movie_list_fs align_center'>
                <Rating rating={rating} handleFilter={handleFilter} rattings={[8,7,6] } />

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
            {
                filterMovies.map(movie => <MovieCard key={movie.id} movie={ movie} />)
                    
                
            }

        </div>

</section>
)
}

export default MovieList