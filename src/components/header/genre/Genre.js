import React from 'react';
import { useHistory } from 'react-router';
import styles from './Genre.module.css';

function Genre({ id, name }) {    
    const history = useHistory();

    const handleSubmit = () => {
        history.push("/genre/" + id);
    }
    
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <button type="submit" className={styles.genre}>
                    { name }
                </button>
            </form>
        </div>
    )
}

export default Genre
