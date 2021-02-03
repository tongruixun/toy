import React ,{useState, useEffect} from 'react';
import classNames from "classnames/bind";
import styles from './index.less'

const cxBind = classNames.bind(styles);

function Directory(props) {

    const [curNav, setCurNav] = useState('');
    const [navList, setNavList] = useState([]);
    const [fixed, setFixed] = useState(false);

    const listenScrollTop = () => {
        setFixed(document.documentElement.scrollTop > 112);
    }

    useEffect(() => {

        window.addEventListener('scroll', listenScrollTop);
        const {dirList} = props;
        let firstLevel = [];
        // 只显示一级标题
        dirList.forEach(item => {
            if (firstLevel.length === 0) {
                firstLevel.push(item);
            } else {
                const lastItem = firstLevel[firstLevel.length - 1];
                if(lastItem.level === item.level) {
                    firstLevel.push(item);
                }
                if (lastItem.level > item.level) {
                    firstLevel = [item];
                }
            }
        })
        setCurNav(firstLevel[0].label)
        setNavList(firstLevel);

        return () => {
            window.removeEventListener('scroll', listenScrollTop)
        }
    }, [])


    const scrollToAnchor = (anchorName) => {
        setCurNav(anchorName);
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement) { anchorElement.scrollIntoView({block: "center", behavior: "smooth"}); }
        }
    }

    return <div className={cxBind({directoryUl: true, fixed})}>
        {
            navList.map(({label}, index) => {
                return <div className={cxBind({directoryLi: true, isActive: curNav === label})} key={index} onClick={() => scrollToAnchor(label)}>{label}</div>
            })
        }
    </div>
}

export default Directory;