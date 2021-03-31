import React from 'react';
import 'antd/dist/antd.css';
import SideTip from '@/layout/SideTip';
import styles from './index.less';

function About(props) {

  return (
    <div className={styles.wrap}>
      <SideTip tipLabel="Home" style={{ bottom: 200 }} uri='/'/>
      <SideTip tipLabel="Data" style={{ bottom: 120 }} uri='/about/enter'/>
      <SideTip tipLabel="Test" uri='/about'/>
      {props.children}
    </div>
  );
}

export default About;
