import React from 'react';
import Calendar from './calendar';
import styles from './index.less';
import { NavMenu, NavBar } from '@/components';

function Home() {
  return (
    <div className={styles.wrap}>
      <NavBar/>
      <Calendar/>
      <NavMenu />
    </div>
  );
}

export default Home;
