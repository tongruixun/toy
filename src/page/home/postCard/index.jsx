import React from 'react';
import {AnCard} from '@/components'
import defaultCoverImg from '@/asset/common/cover_img.jpg'
import styles from "./index.less";
function PostCard({postInfo}) {

    const { title, coverImg, description, date, tags, categories } = postInfo;
    return <AnCard>
        <div className={styles.introduction}>
            <div className={styles.imgWrap}>
                <img src={coverImg || defaultCoverImg}/>
            </div>
            <div className={styles.info}>
                <div>{title}</div>
                <div>{description}</div>
                <div>{date}</div>
            </div>
        </div>
    </AnCard>
}

export default PostCard;