import React from 'react';
import posts from '../../data.json'
import Tags from "./tags";
import PostCard from './postCard';
import defaultCoverImg from '@/asset/common/cover_img.jpg'
import styles from './index.less'

function Home() {

    const postInfoList = () => posts.map(({data}, index) => <PostCard key={index} postInfo={data}/>)

    const tagList = () => posts.map(({data: {tags}}) => tags);

    return <div className={styles.wrap}>
        <div className={styles.posts}>
            <div className={styles.left}>
                {
                    postInfoList()
                }
            </div>
            <div className={styles.right}>
                <Tags tagList={tagList()} />
            </div>
        </div>
    </div>
}
export default Home;