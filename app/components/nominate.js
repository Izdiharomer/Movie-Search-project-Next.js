import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Loading from './loading'

export default function Nominate({nominatedMovies, handleDelete} ) {
  return (
    <div>
        <h2>Nomination List</h2>
        {nominatedMovies.length === 0 && <p>Please nominate best five movies!</p>}
        {nominatedMovies.length === 0}
        <ul>
        {nominatedMovies.map((movie) => (
          <li key={movie.imdbID}>
            <div className="nominate-list">
              {movie.loading ? (
                <Loading />
              ) : (
                <>
                  <img src={movie.Poster} alt={movie.Title} style={{ width: '80px', margin: '15px', borderRadius: '10px' }} />
                  <p>
                    {`${movie.Title} `}
                  </p>
                  <p> {`  _ year: ${movie.Year} ${movie.Type}`}</p>
                  <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDelete(movie.imdbID)} />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

