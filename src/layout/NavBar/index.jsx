import React, { useState, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import { menu } from '@/config/config';
import { debounce } from '@/util/util';
import logo from '@/asset/logo.svg';
import { AnSearch } from '@/components';
import styles from './index.less';

const cxBind = classNames.bind(styles);

function NavBar() {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const onChange = debounce((value) => {
    history.push(`/frontEnd/search/${value}`);
  }, 500);
  const listenScrollTop = () => {
    setShow(document.documentElement.scrollTop >= 64);
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollTop);
    return () => {
      window.removeEventListener('scroll', listenScrollTop);
    };
  }, []);

  const renderNav = (menuData) => menuData.map((item) => {
    if (item.hideMenu) return null;
    return (
      <NavLink activeClassName="selected" exact={item.exact} key={item.path} to={item.path}>
        <span
          className={`iconfont icon-${item.icon}`}
        />
&ensp;
        {item.title}
      </NavLink>
    );
  });
  return (
    <div className={cxBind({ wrap: true, show })}>
      <div className={styles.header}>
        <Link to="/">
          <img alt="" src={logo} />
        </Link>
        有小鱼干么
      </div>
      <div className={styles.navBar}>
        <div className={styles.nav}>
          {
                        renderNav(menu[0].routes)
                    }
        </div>
        <div className={styles.search}>
          <AnSearch onChange={(e) => onChange(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
