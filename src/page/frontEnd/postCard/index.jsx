import React from 'react';
import {Link} from "react-router-dom";
import {AnCard} from '@/components'
import {formatDate} from "@/util/util";
import styles from "./index.less";
function PostCard({postInfo, id}) {

    const { title, description, date, tags, categories } = postInfo;
    return <AnCard>
            <div className={styles.introduction}>
                <div className={styles.info}>
                    <div className={styles.title}>
                        <Link to={`/frontEnd/postDetail/${id}`}>{title}</Link>
                    </div>
                    <div className={styles.desc}>{description}</div>
                    <div>{formatDate(date)}</div>
                    <div className={styles.readMore}>
                        <Link to={`/frontEnd/postDetail/${id}`}>阅读全文...</Link>
                    </div>
                    <div className={styles.tags}>标签:&ensp;{tags}</div>
                </div>
            </div>

    </AnCard>
}

export default PostCard;