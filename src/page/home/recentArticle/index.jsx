import React from 'react';
import {themes} from "@/db";
import {Link} from "react-router-dom";
import styles from './index.less'

function RecentArticle() {
    return <div className={styles.container}>
            <div className={styles.title}>最新文章</div>
            <div className={styles.content}>
                <ul>
                    {
                        themes.map(({data, id}, index) => {
                            if(index > 9) return null;
                            return <li key={id}><Link to={`/frontEnd/postDetail/${id}`}>{data.title}</Link></li>
                        })
                    }
                </ul>
            </div>
        </div>
}

export default RecentArticle;