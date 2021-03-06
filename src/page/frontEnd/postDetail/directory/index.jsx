import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './index.less';

const cxBind = classNames.bind(styles);

function Directory(props) {

  const [curNav, setCurNav] = useState('');

  useEffect(() => {
    setCurNav(props.dirList[0]?.label);
  }, []);

  const scrollToAnchor = (anchorName) => {
    setCurNav(anchorName);
    if (anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
      }
    }
  };

  return <div className={cxBind({ directoryWrapper: true })}>
    {
      props.dirList.map(({
        label,
        level
      }, index) => {
        return <div
          className={cxBind({
            directoryLi: true,
            isActive: curNav === label
          })}
          onClick={() => scrollToAnchor(label)}
          key={index}
          style={{
            fontSize: 20 - level * 2,
            paddingLeft: 10 * level
          }}
        >
          {label}
        </div>;
      })
    }
  </div>;
}

export default Directory;

Directory.propTypes = {
  dirList: PropTypes.arrayOf(PropTypes.object)
};

Directory.defaultProps = {
  dirList: []
};
