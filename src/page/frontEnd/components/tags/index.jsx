import React from 'react';
import {Link} from "react-router-dom";
import styles from './index.less';
import {tags} from "@/db";

function Tags() {

    const colors = [
        '#a61b29',
        '#322f3b',
        '#61649f',
        '#1661ab',
        '#0eb0c9',
        '#869d9d',
        '#55bb8a',
        '#f9c116',
        '#bec936',
        '#835e1d'
    ]

    return <div className={styles.tags}>
        {
            tags.map((tag, index) => {
                const random = Math.floor(Math.random() * 10);
                return <em key={index} >
                    <Link style={{color: colors[random], fontSize: random + 10}} to={`/frontEnd/tag/${tag}`}>{tag}</Link>
                </em>
            })
        }
    </div>
}

export default Tags;