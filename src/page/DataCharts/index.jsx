import React, { useRef, useEffect } from 'react';
import styles from './index.less';

function DataEcharts() {

  const chartsRef = useRef(null);

  useEffect(() => {

  }, []);

  return <div className={styles.wrap}>
    <div className={styles.charts} ref={chartsRef}/>
  </div>;
}

export default DataEcharts;
