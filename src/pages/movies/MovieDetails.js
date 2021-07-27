import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { get } from '../../utils/httpClient';
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';
import styles from './MovieDetails.module.css';
const imageURL = 'https://image.tmdb.org/t/p/w300';

function MovieDetails() {
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        get("/movie/", movieId).then((data) => {
            setIsLoading(false);
            setMovie(data);
            console.log(data);
        });
    }, [movieId]);

    if(isLoading){
        return(
            <div className="movieLoading">
                <Loading />
            </div>
        )
    }

    if(!movie){
        return null;
    }

    return (
        <div className={styles.movieDetails}>
            <Header />
            <div className={styles.movieDetails__info}>
                <img src={imageURL + movie.poster_path} className={styles.detailsImage} alt="" />
                <div className={styles.movieDetails__info__data}>
                    <p className={styles.movie__title}>{movie.original_title}</p>
                    <p className={styles.movie__subtitle}>{movie.tagline}</p>

                    <div className={styles.movieDetails__info__data__time}>
                        <p className={styles.runtime}>Duration: {movie.runtime} minutes</p>
                        <p className={styles.release_date}>Release date: {movie.release_date}</p>
                        <p className={styles.vote_average}>{movie.vote_average}</p>
                    </div>

                    <p className={styles.description}>{movie.overview}</p>
                    <div className={styles.movieDetails__info__data__genres}>
                        <p className={styles.genresTitle}>Genres:</p>
                        {movie.genres.map((genre) => (
                            <button className={styles.genre}>{genre.name}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.movieDetails__video}>
                <p>{movie.original_title}</p>
                <p>Movie here</p>
            </div>
        </div>
    )
}

export default MovieDetails
