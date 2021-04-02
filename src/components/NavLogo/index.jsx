import React from 'react';
import styles from './index.less';
import { Link } from 'react-router-dom';
import logo from '@/asset/logo.svg';

function NavHome() {
  return (
    <div className={styles.header}>
      <Link to="/">
        <img alt="" src={logo}/>
      </Link>
      有小鱼干么
    </div>
  );
}

export default NavHome;
