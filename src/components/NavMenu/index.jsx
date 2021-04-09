import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.less';

const navConfig = [
  {
    path: '/frontEnd',
    title: '文章总览',
    icon: 'FE'
  }, {
    path: '/',
    title: '首页',
    icon: 'home'
  }, {
    path: '/record/Login',
    title: '关于',
    icon: 'aboutme'
  }, {
    path: '/',
    title: '功能测试页',
    icon: 'xinjian'
  }, {
    path: '/',
    title: '数据录入',
    icon: 'xinjian'
  }, {
    path: '/',
    title: '主题',
    icon: 'xinjian'
  },
];

function NavMenu() {
  return (
    <div className={styles.wrap}>
      <nav className={styles.menu}>
        <input type='checkbox' className={styles.menuOpen} name='menuOpen' id='menuOpen'/>
        <label className={styles.menuOpenButton} htmlFor='menuOpen'>
          <span className={classnames(styles.hamburger, styles.hamburger1)}/>
          <span className={classnames(styles.hamburger, styles.hamburger2)}/>
          <span className={classnames(styles.hamburger, styles.hamburger3)}/>
        </label>
        {
          navConfig.map(({
            path,
            title,
            icon
          }) => (<Link key={title} to={path} title={title} className={styles.menuItem}> <i
            className={`iconfont icon-${icon}`}/> </Link>))
        }
      </nav>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="shadowed-goo">

            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"/>
            <feColorMatrix in="blur" mode="matrix"
                           values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow"/>
            <feColorMatrix in="shadow" mode="matrix"
                           values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow"/>
            <feOffset in="shadow" dx="1" dy="1" result="shadow"/>
            <feComposite in2="shadow" in="goo" result="goo"/>
            <feComposite in2="goo" in="SourceGraphic" result="mix"/>
          </filter>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"/>
            <feColorMatrix in="blur" mode="matrix"
                           values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
            <feComposite in2="goo" in="SourceGraphic" result="mix"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default NavMenu;
