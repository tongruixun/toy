import React from 'react';
import NavBar from '@/layout/NavBar';
import Calendar from './calendar';
import styles from './index.less';

function Home() {
  return (
    <div className={styles.wrap}>
      <NavBar/>
      <Calendar/>
    </div>
  );
}

export default Home;
