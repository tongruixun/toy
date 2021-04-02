import React from 'react';
import NavBar from '@/layout/NavBar';
import Calendar from './calendar';
import styles from './index.less';
import { NavMenu } from '@/components';

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
