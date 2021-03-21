import React, {useEffect, useRef} from 'react';
import styles from './index.less'
import NavBar from "@/layout/NavBar";
import * as echarts from 'echarts';
import initChinaData from './china.json';

const allData = [
    {
        name: '北京市', cp: [116.4551, 40.2539]
    }, {
        name: '天津市', cp: [117.4219, 39.4189]
    }, {
        name: '上海市', cp: [121.4648, 31.2891]
    }, {
        name: '重庆市', cp: [107.7539, 30.1904]
    }, {
        name: '河北省', cp: [115.4004, 37.9688]
    }, {
        name: '河南省', cp: [113.4668, 33.8818]
    }, {
        name: '云南省', cp: [101.8652, 25.1807]
    }, {
        name: '辽宁省', cp: [122.3438, 41.0889]
    }, {
        name: '黑龙江省', cp: [128.1445, 48.5156]
    }, {
        name: '湖南省', cp: [111.5332, 27.3779]
    }, {
        name: '安徽省', cp: [117.2461, 32.0361]
    }, {
        name: '山东省', cp: [118.7402, 36.4307]
    }, {
        name: '新疆维吾尔自治区', cp: [84.9023, 41.748]
    }, {
        name: '江苏省', cp: [120.0586, 32.915]
    }, {
        name: '浙江省', cp: [120.498, 29.0918]
    }, {
        name: '江西省', cp: [116.0156, 27.29]
    }, {
        name: '湖北省', cp: [112.2363, 31.1572]
    }, {
        name: '广西壮族自治区', cp: [108.2813, 23.6426]
    }, {
        name: '甘肃省', cp: [95.7129, 40.166]
    }, {
        name: '山西省', cp: [112.4121, 37.6611]
    }, {
        name: '内蒙古自治区', cp: [117.5977, 44.3408]
    }, {
        name: '陕西省', cp: [109.5996, 35.6396]
    }, {
        name: '吉林省', cp: [126.4746, 43.5938]
    }, {
        name: '福建省', cp: [118.3008, 25.9277]
    }, {
        name: '贵州省', cp: [106.6113, 26.9385]
    }, {
        name: '广东省', cp: [113.4668, 22.8076]
    }, {
        name: '青海省', cp: [96.2402, 35.4199]
    }, {
        name: '西藏自治区', cp: [88.7695, 31.6846]
    }, {
        name: '四川省', cp: [102.9199, 30.1904]
    }, {
        name: '宁夏回族自治区', cp: [105.9961, 37.3096]
    }, {
        name: '海南省', cp: [109.9512, 19.2041]
    }, {
        name: '台湾省', cp: [121.0254, 23.5986]
    }, {
        name: '香港特别行政区', cp: [114.2578, 22.3242]
    }, {
        name: '澳门特别行政区', cp: [113.5547, 22.1484]
    }
];

const initOption = {
    backgroundColor: 'rgba(192, 196, 195, 0.4)',
    tooltip: {},
    visualMap: {
        type: 'piecewise',
        pieces: [
            {gte: 50, color: '#00182E'},
            {gte: 20, lt: 50, color: '#014669'},
            {lt: 20, color: '#007092'}
        ],
        showLabel: true,
    },
    series: [
        {
            name: 'MAP',
            type: 'map',
            map: 'china',
            label: {
                show: true,
                color: 'rgba(245,245,245, 0.5)',
                fontSize: 17,
            },
            itemStyle: {
                borderColor: '#007092',
                borderWidth: 0.5,
            },
            // 高亮时的样式
            emphasis: {
                itemStyle: {
                    areaColor: '#f98a00',
                    borderColor: '#00F2FA',
                    borderWidth: 0.5
                }
            },
            z: 2,
            data: allData.map((item, index) => Math.round(Math.random() * 70))
        }]
};

function About() {
    const chartsRef = useRef(null);

    useEffect(() => {
        echarts.registerMap('china', initChinaData);
        const myChart = echarts.init(chartsRef.current);
        myChart.setOption(initOption, true);
    }, [])

    return <div className={styles.wrap}>
        <NavBar/>
        <div className={styles.charts} ref={chartsRef}/>
    </div>
}

export default About;
