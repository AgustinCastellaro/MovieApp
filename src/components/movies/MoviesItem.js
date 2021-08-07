import React from 'react';
import { Link } from "react-router-dom";
import styles from './MoviesItem.module.css';
import { CgPlayButtonO } from "react-icons/cg";
const imageURL = 'https://image.tmdb.org/t/p/w300';

function MoviesItem({ movie }) {
    return (
        <li className={styles.moviesItem}>
            <Link to={ "/movies/" + movie.id }>
                <img src={imageURL + movie.poster_path} className={styles.movieImage} alt={movie.title} />
            </Link>
            <div className={styles.movieInfo}>
                <p className={styles.title}>{movie.title}</p>
            </div>
            <CgPlayButtonO className={styles.iconPlay} />
            <div className={styles.movieInfoHover}>
                <div className={styles.movieInfoHover__content}>    
                    <p className={styles.title}>{movie.title}</p>
                    <p className={styles.description}>{movie.overview}</p>
                    <p className={styles.vote_average}>{movie.vote_average}</p>
                </div>
                <div className={styles.movieInfoHover__img}>
                    <img src={imageURL + movie.poster_path} className={styles.movieImage} alt={movie.title} />
                </div>
            </div>
        </li>
    )
}

export default MoviesItem
