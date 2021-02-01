import React from 'react';
import {Link} from "react-router-dom";
import {AnCard} from '@/components'
import {formatDate} from "@/util/util";
import defaultCoverImg from '@/asset/common/cover_img.jpg'
import styles from "./index.less";
function PostCard({postInfo, id}) {

    const { title, coverImg, description, date, tags, categories } = postInfo;
    return <AnCard>
        <Link to={`/frontEnd/postDetail/${id}`}>
            <div className={styles.introduction}>
                <div className={styles.imgWrap}>
                    <img src={coverImg || defaultCoverImg}/>
                </div>
                <div className={styles.info}>
                    <div>{title}</div>
                    <div>{description}</div>
                    <div>{formatDate(date)}</div>
                </div>
            </div>
        </Link>
    </AnCard>
}

export default PostCard;