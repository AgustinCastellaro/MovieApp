import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { get } from '../../utils/httpClient';
import { useQuery } from '../../hooks/useQuery';
import Loading from '../loading/Loading';
import MoviesItem from './MoviesItem';
import NotMovies from '../notMovies/NotMovies';
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import styles from './MoviesGrid.module.css';

let actualPage = 1;
let totalPages;
let path;
let secondaryParam;

function MoviesGrid() {
    const [disabledLeft, setDisabledLeft] = useState(true);
    const [disabledRight, setDisabledRight] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const query = useQuery();
    const search = query.get("search");

    const location = useLocation()
    const params = useParams()
    
    useEffect(() => {
        setIsLoading(true);
        if(search){
            path = "/search/movie?query=";
            secondaryParam = search;
        }else{
            path = "/discover/movie/";
            if(params.genreId){
                console.log("with genre");
                secondaryParam = params.genreId;
            }else{
                console.log("without genre");
            }
        }
        get(path, secondaryParam, 1, location.pathname).then((data) => {
            console.log(data);
            totalPages = data.total_pages;
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

    //Pagination.
    const adjacentPage = (adjacentPage) => {
        console.log(adjacentPage);
        (adjacentPage > 1 || adjacentPage == totalPages) ? setDisabledLeft(false) : setDisabledLeft(true);
        (adjacentPage == totalPages) ? setDisabledRight(true) : setDisabledRight(false);
        setIsLoading(true);
        if(search){
            console.log("in a search");
            path = "/search/movie?query=";
            secondaryParam = search;
        }else{
            path = "/discover/movie/";
            if(params.genreId){
                console.log("in a genre");
                secondaryParam = params.genreId;
            }
        }
        get(path, secondaryParam, adjacentPage, location.pathname).then((data) => {
            console.log(data);
            setMovies(data.results);
            setIsLoading(false);
        });
        window.scrollTo(0, 0)
        actualPage = adjacentPage
    }

    //Movies grid.
    return (
        <div className={styles.moviesGrid}>
            <div className={styles.pagination__top}>
                <button onClick={() => adjacentPage(actualPage - 1)} disabled={disabledLeft}>
                    <RiArrowLeftSLine />
                </button>
                <div className={styles.pages}>
                    <p className={styles.actualPage}>{actualPage}</p>
                    <p>of</p>
                    <p className={styles.totalPages}>{totalPages}</p>
                </div>
                <button onClick={() => adjacentPage(actualPage + 1)} disabled={disabledRight}>
                    <RiArrowRightSLine />
                </button>
            </div>

            <ul className={styles.moviesGrid__grid}>
                {movies.map((movie) => (
                    <MoviesItem key={movie.id} movie={movie} />
                ))}
            </ul>
            
            <div className={styles.pagination}>
                <button onClick={() => adjacentPage(actualPage - 1)} disabled={disabledLeft}>
                    <RiArrowLeftSLine />
                </button>
                <div className={styles.pages}>
                    <p className={styles.actualPage}>{actualPage}</p>
                    <p>of</p>
                    <p className={styles.totalPages}>{totalPages}</p>
                </div>
                <button onClick={() => adjacentPage(actualPage + 1)} disabled={disabledRight}>
                    <RiArrowRightSLine />
                </button>
            </div>
        </div>
    )
}

export default MoviesGrid 
