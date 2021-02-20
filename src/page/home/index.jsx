import React from 'react';
import RecentArticle from "./recentArticle";
import headerImg from '@/asset/common/study.jpg';
import styles from './index.less'

function Home() {

    return <div className={styles.wrap}>
        <div className={styles.sideRight}>
            <div className={styles.headImg}>
                <img src={headerImg} alt='img'/>
            </div>
            <RecentArticle />
        </div>
    </div>
}
export default Home;