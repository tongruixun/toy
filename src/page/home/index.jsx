import React from 'react';
import RecentArticle from "./recentArticle";
import PopularArticle from "./popularArticle";
import {themes} from "@/db";
import styles from './index.less'

function Home() {

    const datasource = themes.filter((item, index) => index < 10);
    return <div className={styles.wrap}>
        <div className={styles.sideRight}>
            <PopularArticle datasource={datasource}/>
            <RecentArticle datasource={datasource}/>
        </div>
    </div>
}
export default Home;