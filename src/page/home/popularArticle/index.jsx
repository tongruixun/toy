import React from 'react';
import {formatDate} from "@/util/util";
import styles from './index.less'
import {Link} from "react-router-dom";

function PopularArticle({datasource}) {
    return <div className={styles.popularArticle}>
        <div className={styles.header}>
            <h2>
                Popular<br/>this<br/>month
            </h2>
            <p>
                Sponsored by<br/>Frontend Master
            </p>
        </div>
        <div className={styles.cardGrid}>
            {
                datasource.map(({data, id}) => {
                    return (
                        <article key={id} className={styles.popularCard}>
                            <time>
                                <strong>Article</strong>{` on ${formatDate(data.date, 'MMM,DD,YYYY')}`}
                            </time>
                            <h3><Link to={`/frontEnd/postDetail/${id}`}>{data.title}</Link></h3>
                        </article>
                    )
                })
            }
        </div>
    </div>
}

export default PopularArticle;