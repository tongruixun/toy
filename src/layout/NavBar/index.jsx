import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';
import { NavLogo } from '@/components';

const cxBind = classNames.bind(styles);

function NavBar() {
  const [show, setShow] = useState(false);

  const listenScrollTop = () => {
    setShow(document.documentElement.scrollTop >= 64);
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollTop);
    return () => {
      window.removeEventListener('scroll', listenScrollTop);
    };
  }, []);

  return (
    <div className={cxBind({
      wrap: true,
      show
    })}>
      <NavLogo />
    </div>
  );
}

export default NavBar;
