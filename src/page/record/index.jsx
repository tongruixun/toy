import React from 'react';
import 'antd/dist/antd.css';
import styles from './index.less';


function About(props) {

  return (<div className={styles.wrap}>
      {props.children}
    </div>
  );
}

export default About;
