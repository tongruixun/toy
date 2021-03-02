import React from 'react';
import RecentArticle from "./recentArticle";
import PopularArticle from "./popularArticle";
import Calendar from "./calendar";
import {themes} from "@/db";
import styles from './index.less'

function Home() {

    const datasource = themes.filter((item, index) => index < 10);
    return <div className={styles.wrap}>
        <Calendar />
        <div className={styles.sideRight}>
            <div className={styles.section}>
                <RecentArticle datasource={datasource}/>
            </div>
            <PopularArticle datasource={datasource}/>
        </div>
    </div>
}
export default Home;