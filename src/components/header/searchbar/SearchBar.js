import React, { useState, useEffect, useRef } from 'react'
import styles from './SearchBar.module.css';
import { useHistory } from 'react-router';
import { BiSearch } from 'react-icons/bi';
import { useQuery } from '../../../hooks/useQuery';

function SearchBar() {
    const query = useQuery();
    const search = query.get("search");
    
    const [searchValue, setSearchValue] = useState("");
    const history = useHistory();
    
    const input = useRef(null);

    //Si hay un cambio en el input, se cambia el valor del searchValue.
    useEffect(() => {
        setSearchValue(search || "");
    }, [search])

    //Si hay un cambio en el input, se cambia el valor de la url para realizar la busqueda.
    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/?search=" + searchValue);
    }

    const handleClick = () => {
        input.current.focus()
    }

    return (
        <div className={styles.searchbar}>
            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className={styles.searchbar__input} 
                    ref={input}
                    placeholder="Search movies..." 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)} 
                />
                <button type="button" className={styles.searchbar__button} onClick={handleClick}>
                    <BiSearch />
                </button>
            </form>
        </div>
    )
}

export default SearchBar
