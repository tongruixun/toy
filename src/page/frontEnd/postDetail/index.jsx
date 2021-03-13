import React from 'react';
import {useParams} from 'react-router-dom';
import {formatDate} from "@/util/util";
import Directory from "./directory";
import styles from './index.less'
import {postsMap} from "@/db";

function PostDetail() {
    let {id} = useParams();
    const html = postsMap[id].content;
    const data = postsMap[id].data;
    const directory = postsMap[id].directory;
    return <div className={styles.wrap}>
        <Directory dirList={directory}/>
        <div className={styles.article}>
            <div className={styles.header}>
                <div>{data.title}</div>
                <div className={styles.date}><span className="iconfont icon-date"/>&ensp;{formatDate(data.date)}</div>
            </div>
            <div dangerouslySetInnerHTML={{__html: html}}/>
        </div>
    </div>
}

export default PostDetail;