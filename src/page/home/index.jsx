import React from 'react';
import { themes } from '@/db';
import NavBar from '@/layout/NavBar';
import SideTip from '@/layout/SideTip';
import PopularArticle from './components/popularArticle';
import Calendar from './calendar';
import styles from './index.less';

function Home() {
  const datasource = themes.filter((item, index) => index < 10);
  return (
    <div className={styles.wrap}>
      <NavBar/>
      <SideTip tipLabel="文章" style={{ bottom: 200 }} uri='/frontEnd'/>
      <SideTip tipLabel="关于" style={{ bottom: 120 }} uri='/about'/>
      <Calendar/>
      <PopularArticle datasource={datasource}/>
    </div>
  );
}

export default Home;
