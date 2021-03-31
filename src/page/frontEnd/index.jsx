import React from 'react';
import styles from './index.less';
import { config } from '@/db';
import RainCanvas from './components/RainCanvas';
import Tags from './components/tags';
import SubNav from './components/subNav';
import { Link } from 'react-router-dom';
import logo from '@/asset/logo.svg';
import SideTip from '@/layout/SideTip';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.head}>
        <div className={styles.headLink}>
          <Link to='/'>
            <img src={logo} alt='logo'/>
          </Link>
          有小鱼干么
        </div>
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
      <SideTip tipLabel="总览" style={{ bottom: 280 }} uri='/frontEnd'/>
      <SideTip tipLabel="首页" style={{ bottom: 200 }} uri='/'/>
      <SideTip tipLabel="关于" style={{ bottom: 120 }} uri='/about'/>
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
