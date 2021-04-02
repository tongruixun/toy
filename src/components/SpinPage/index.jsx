import React from 'react';
import PropTypes from 'prop-types';
import { PageLoading } from '@/components';
import styles from './index.less'

function SpinPage({
  children,
  spinning
}) {
  return <div className={styles.spinWrap}>
    {
      spinning && (<div className={styles.spinning}><PageLoading/></div>)
    }
    {children}
  </div>;
}

export default SpinPage;

SpinPage.propTypes = {
  spinning: PropTypes.bool
};

SpinPage.defaultProps = {
  spinning: false
};
