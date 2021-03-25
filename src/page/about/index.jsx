import React from 'react';
import 'antd/dist/antd.css';
import styles from './index.less'
import SideTip from "@/layout/SideTip";
import {useHistory} from "react-router-dom";


function About(props) {

    let history = useHistory();

    function pageNav(uri) {
        history.push(uri);
    }

    return <div className={styles.wrap}>
        <SideTip tipLabel="Home" style={{bottom: 200}} onClick={() => pageNav('/')}/>
        <SideTip tipLabel="Data" style={{bottom: 120}} onClick={() => pageNav('/about/enter')}/>
        <SideTip tipLabel="Test" onClick={() => pageNav('/about')}/>
        {props.children}
    </div>
}

export default About;




