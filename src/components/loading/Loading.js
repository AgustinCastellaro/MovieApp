import React from 'react'
import { ImSpinner9 } from 'react-icons/im';
import styles from './Loading.module.css';

function Loading() {
    return (
        <div className={styles.loading}>
            <ImSpinner9 className={styles.loading__icon} />
        </div>
    )
}

export default Loading
