'use client'

import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Nominate from './components/nominate';



import { searchMovies } from './components/api';


const MovieSearch = () => {
  const [searchMovie, setSearchMovie] = useState('');
  const [movies, setMovies] = useState([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);


  const handleSearch = async () => {
    try {
      const data = await searchMovies(searchMovie);
      setMovies(data);
      setSearchMovie('');
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };


  const addMovieToNominated = (movie) => {
    if (nominatedMovies.length < 5) {
      const isAlreadyNominated = nominatedMovies.some((nominatedMovie) => nominatedMovie.imdbID === movie.imdbID);
      if (!isAlreadyNominated) {
        setNominatedMovies((prevNominatedMovies) => [...prevNominatedMovies, movie]);
      } else {
        alert('You have already nominated this movie.');
       
      }
    } else {
      alert('Only five movies can be nominated.');
    }
  };

  const handleNominate = (movie) => {
    addMovieToNominated(movie);
  };

 

  const handleDelete = (imdbID) => {
    setNominatedMovies((prevNominatedMovies) =>
      prevNominatedMovies.filter((movie) => movie.imdbID !== imdbID)
    );
  };
  
  return (
    <div  className='container'>
      
      <div  className='container-search'>
        <h2>Search Movies</h2>

        <div className={`input-search`}> 
           <input type="text" value={searchMovie} onChange={(e) => setSearchMovie(e.target.value)} placeholder="Search for a movie"  list="autocomplete-options"/>
           <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearch}  /></div>
           <h3>Search results</h3>
          {movies.length > 0 && (
            <ul>
              {movies.map((movie) => (
                <li key={movie.imdbID}>
                  <p style={{ color: 'rgb(10, 92, 92)', fontWeight: 'bold' }}>
                  {`${movie.Title} `}
                  </p>
                  <p>{` year:  ${movie.Year},  ${movie.Type}`}</p>
                  <button className={`button button-nominate`} onClick={() => handleNominate(movie) }>Nominate</button>
                </li>
              ))}
            </ul>
          )}
      </div>

      
      <div className='container-nominate'>
      <Nominate nominatedMovies={nominatedMovies} handleDelete={handleDelete}/>
      </div>

     

    </div>
  );
};

export default MovieSearch;
