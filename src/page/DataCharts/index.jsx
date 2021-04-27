import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import initChinaData from './china.json';
import imgSrc from '@/asset/img/card/art-5.jpg';
import styles from './index.less';

const initOption = {
  series: [
    {
      name: 'MAP',
      type: 'map',
      map: 'china',
      selectedMode: 'false', // 是否允许选中多个区域
      label: {
        show: true,
        color: '#F5F5F5',
        fontSize: 12
      },
      itemStyle: {
        borderColor: '#00f2fa',
        borderWidth: 1.5,
        areaColor: {
          image: '',
          repeat: 'repeat'
        }
      },
      emphasis: {
        itemStyle: {
          show: false,
          areaColor: '#F98A00'
        }
      },
      z: 2,
    }
  ]
};

function DataEcharts() {

  const chartsRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartsRef.current);
    echarts.registerMap('china', initChinaData);
    const imgDom = new Image();
    imgDom.src = imgSrc;
    imgDom.onload = () => {
      initOption.series[0].itemStyle.areaColor.image = imgDom;
      chart.setOption(initOption, true);
    };
  }, []);

  return <div className={styles.wrap}>
    <div className={styles.charts} ref={chartsRef}/>
  </div>;
}

export default DataEcharts;
