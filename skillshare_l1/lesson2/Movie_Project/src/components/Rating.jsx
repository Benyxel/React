import React from 'react'

const Rating = ({rating ,handleFilter, ratings}) => {
  return (
    
      <ul className='movie_filter align_center'>
          {}
                <li className={rating === 8 ? "movie_filter_item active" : "movie_filter_item" } onClick={()=> handleFilter(8)}>8+ Star</li>
                <li className={rating === 7 ? "movie_filter_item active" : "movie_filter_item" } onClick={()=> handleFilter(7)}>7+ Star</li>
                <li className={rating === 6 ? "movie_filter_item active" : "movie_filter_item" } onClick={()=> handleFilter(6)}>6+ Star</li>

            </ul>
    
  )
}

export default Rating