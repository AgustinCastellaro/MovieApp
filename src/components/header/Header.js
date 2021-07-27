import React, { useRef, useEffect, useState } from 'react';
import styles from './Header.module.css';
import SearchBar from './searchbar/SearchBar';
import Genre from './genre/Genre.js'
import { get } from '../../utils/httpClient';
import { Link } from "react-router-dom";

function Header() {
    const [genres, setGenres] = useState([]);

    const scrollRef = useRef();
    const handleScroll = (scrollValue) => {
        scrollRef.current.scrollLeft += scrollValue;
    };

    useEffect(() => {
        get("/genre/movie/list").then((data) => {
            setGenres(data.genres)
        });
    }, [])
    
    return (
        <div className={styles.header}>
            <nav>
                <Link to="/">
                    <a href="" className={styles.logo}>MovieApp</a>
                </Link>
                <input type="checkbox" name="check" id="menu" />
                <label htmlFor="menu" className={styles.hamburgerIcon}>
                    <span className={styles.bar1}></span>
                    <span className={styles.bar2}></span>
                    <span className={styles.bar3}></span>
                </label>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <a href="#">Genre</a>
                        <ul className={styles.submenu}>
                            {genres.map((genre) => (
                                <li>
                                    <Genre key={genre.id} id={genre.id} name={genre.name} />
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
                <SearchBar className={styles.searchBar} />
            </nav>
        </div>
    )
}

export default Header
