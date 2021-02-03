import React from 'react';
import RecentArticle from "./recentArticle";
import styles from './index.less'

function Home() {

    return <div className={styles.wrap}>
        <RecentArticle />
    </div>
}
export default Home;