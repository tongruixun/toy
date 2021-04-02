import React from 'react';
import styles from './index.less';
import { config } from '@/db';
import RainCanvas from './components/RainCanvas';
import Tags from './components/tags';
import SubNav from './components/subNav';
import { NavLogo } from '@/components';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.head}>
        <NavLogo />
        <RainCanvas/>
      </div>
      <div className={styles.sidebarContain}>
        <SubNav subNav={config.subNav}/>
        <Tags/>
      </div>
    </div>
  );
}

function FrontEnd(props) {
  return (
    <div className={styles.wrap}>
      {/*侧边栏*/}
      <Sidebar/>
      {/*内容主体*/}
      <div className={styles.contain}>
        <div className={styles.main}>
          {
            props.children
          }
        </div>
      </div>
    </div>
  );
}

export default FrontEnd;
