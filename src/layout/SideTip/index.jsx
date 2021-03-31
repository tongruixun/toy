import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './index.less';

function SideTip({
  tipLabel,
  style,
  uri
}) {

  const history = useHistory();

  function pageNav(uri) {
    history.push(uri);
  }

  function handleClick() {
    pageNav(uri);
  }

  return (
    <div
      style={{
        right: 40,
        bottom: 40, ...style
      }}
      className={styles.sideTip}
    >
      <button
        data-label={tipLabel}
        className={styles.btn}
        onClick={handleClick}
      />
    </div>
  );
}

export default SideTip;

SideTip.propTypes = {
  tipLabel: PropTypes.string,
  style: PropTypes.object,
  uri: PropTypes.string
};

SideTip.defaultProps = {
  tipLabel: 'boom',
  style: {},
  uri: ''
};
