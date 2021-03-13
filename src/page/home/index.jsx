import React from 'react';
import RecentArticle from "./components/recentArticle";
import PopularArticle from "./components/popularArticle";
import Calendar from "./calendar";
import {themes} from "@/db";
import styles from './index.less'
import NavBar from "@/layout/NavBar";

function Home() {

    const datasource = themes.filter((item, index) => index < 10);
    return <div className={styles.wrap}>
        <NavBar />
        <Calendar />
        <div className={styles.sideRight}>
            <PopularArticle datasource={datasource}/>
            <div className={styles.section}>
                <RecentArticle datasource={datasource}/>
            </div>
        </div>
    </div>
}
export default Home;