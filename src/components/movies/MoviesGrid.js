import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { get } from '../../utils/httpClient';
import { useQuery } from '../../hooks/useQuery';
import Loading from '../loading/Loading';
import MoviesItem from './MoviesItem';
import NotMovies from '../notMovies/NotMovies';
import styles from './MoviesGrid.module.css';

let actualPage = 1;
let totalPages;
let path;
let secondaryParam;
let moviesList = [];

function MoviesGrid() {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const query = useQuery();
    const search = query.get("search");

    const location = useLocation()
    const params = useParams()

    const observer = useRef();
    const lastMovie = useCallback(node => {
        if(actualPage < totalPages){
            if(observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if(entries[0].isIntersecting){
                    console.log("visible")
                    if(search){
                        path = "/search/movie?query=";
                        secondaryParam = search;
                    }else{
                        path = "/discover/movie/";
                        (params.genreId) ? secondaryParam = params.genreId : console.log("without genre") ;
                    }
                    get(path, secondaryParam, actualPage + 1, location.pathname).then((data) => {
                        moviesList = moviesList.concat(data.results);
                        setMovies(moviesList);
                        actualPage = actualPage + 1
                        console.log(moviesList)
                    });
                }
            })
            if(node) observer.current.observe(node)
        }
    })
    
    useEffect(() => {
        setIsLoading(true);
        if(search){
            path = "/search/movie?query=";
            secondaryParam = search;
        }else{
            path = "/discover/movie/";
            (params.genreId) ? secondaryParam = params.genreId : console.log("without genre") ;
        }
        get(path, secondaryParam, 1, location.pathname).then((data) => {
            totalPages = data.total_pages;
            moviesList = data.results
            setMovies(data.results);
            setIsLoading(false);
        });
    }, [search]);

    //Pantalla de carga.
    if(isLoading){
        return(
            <div className="movieLoading">
                <Loading />
            </div>
        )
    }

    //Si no encuentra ninguna pelicula.
    if(movies.length == 0){
        return(
            <NotMovies />
        )
    }

    //Movies grid.
    return (
        <div className={styles.moviesGrid}>
            <ul className={styles.moviesGrid__grid}>
                {movies.map((movie, i) => {
                    if(movies.length === i + 1){
                       return (
                        <div ref={lastMovie}>
                            <MoviesItem key={movie.id} movie={movie} />
                        </div>
                       )
                    }else{
                        return <MoviesItem key={movie.id} movie={movie} />
                    }
                })}
            </ul>
        </div>
    )
}

export default MoviesGrid 
