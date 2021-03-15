import React from 'react';
import {Link} from "react-router-dom";
import {AnTagsLink} from '@/components'
import {formatDate} from "@/util/util";
import styles from "./index.less";

function PostCard({postInfo, id}) {

    const {title, date, tags} = postInfo;

    return <div className={styles.introduction}>
        <div className={styles.info}>
            <div className={styles.title}>
                <Link to={`/frontEnd/postDetail/${id}`}>{title}</Link>
            </div>
            <AnTagsLink tags={tags}/>
            <div>{formatDate(date)}</div>
        </div>
    </div>
}

export default PostCard;
