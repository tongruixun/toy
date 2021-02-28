import React from 'react';
import {Link} from "react-router-dom";
import styles from './index.less'

function RecentArticle({datasource}) {
    return <div className={styles.container}>
            <div className={styles.title}>最新文章</div>
            <div className={styles.content}>
                <ul>
                    {
                        datasource.map(
                            ({data, id}) => (
                                <li key={id}><Link to={`/frontEnd/postDetail/${id}`}>{data.title}</Link></li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
}

export default RecentArticle;