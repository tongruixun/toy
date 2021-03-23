import React from 'react';
import RecentArticle from "./components/recentArticle";
import PopularArticle from "./components/popularArticle";
import Calendar from "./calendar";
import {themes} from "@/db";
import styles from './index.less'
import NavBar from "@/layout/NavBar";
import SideTip from "@/layout/SideTip"
import {TipModal} from "@/components";

function Home() {


    const datasource = themes.filter((item, index) => index < 10);
    return <div className={styles.wrap}>
        <NavBar/>
        <SideTip>
            <div className={styles.tipInfo}>
                <article>
                    <h3>正寻觅前端</h3>
                    <p><strong>招聘团队：</strong>平台前端技术部</p>
                    <p><strong>招聘层级：</strong>P5 ~ P8</p>
                    <p><strong>技术栈：</strong>不限</p>
                    <p><strong>工作城市：</strong>杭州、上海、成都</p>
                    <p><strong>面试效率：</strong>一周面完</p>
                    <p><strong>团队作品：</strong>*******</p>
                    <a>发送简历</a>
                </article>
            </div>
        </SideTip>
        <SideTip
            tipLabel="最新"
            option={{
                bottom: 120
            }}
        >
            <div className={styles.section}>
                <RecentArticle datasource={datasource}/>
            </div>
        </SideTip>
        <Calendar/>
        <div className={styles.sideRight}>
            <PopularArticle datasource={datasource}/>
        </div>
    </div>
}

export default Home;