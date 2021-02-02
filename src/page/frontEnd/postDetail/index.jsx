import React from 'react';
import {useParams} from 'react-router-dom';
import {formatDate} from "@/util/util";
import Directory from "./directory";
import styles from './index.less'
import postData from '../../../db/posts.json';

function PostDetail() {
    let { id } = useParams();
    const html = postData[id].content;
    const data = postData[id].data;
    const directory = postData[id].directory;
    console.log(directory);
    return  <div className={styles.wrap}>
                <div className={styles.entryNav}>
                    <Directory dirList={directory}/>
                </div>
                <div className={styles.article}>
                    <div className={styles.header}>
                        <div>{data.title}</div>
                        <div className={styles.date}><span className="iconfont icon-date"/>&ensp;{formatDate(data.date)}</div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: html}} />
                </div>
        </div>
}

export default PostDetail;