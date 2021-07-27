import React from 'react';
import { Link } from "react-router-dom";
import styles from './MoviesItem.module.css';
const imageURL = 'https://image.tmdb.org/t/p/w300';

function MoviesItem({ movie }) {    
    return (
        <li className={styles.moviesItem}>
            <Link to={ "/movies/" + movie.id }>
                <img src={imageURL + movie.poster_path} className={styles.movieImage} alt={movie.title} />
            </Link>
            <div className={styles.movieInfo}>
                <p className={styles.title}>{movie.title}</p>
                <p className={styles.vote_average}>{movie.vote_average}</p>
            </div>
        </li>
    )
}

export default MoviesItem
