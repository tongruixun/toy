import React from 'react';
import {useParams} from 'react-router-dom';
import {AnCard} from '@/components'
import {formatDate} from "@/util/util";
import styles from './index.less'
import postData from '../../../db/posts.json';

function PostDetail() {
    let { id } = useParams();
    const html = postData[id].content;
    const data = postData[id].data;
    return  <div className={styles.wrap}>
                <div className={styles.article}>
                    <div className={styles.header}>
                        <div>{data.title}</div>
                        <div className={styles.date}><span className="iconfont icon-date"/>&ensp;{formatDate(data.date)}</div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: html.replace(/<pre>/g, "<pre class='hljs'>")}} />
                </div>
        </div>
}

export default PostDetail;