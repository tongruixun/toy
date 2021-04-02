import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

function PageLoading() {
  return (
    <div className={styles.loader}>
      <div className={classnames(styles.inner, styles.one)}/>
      <div className={classnames(styles.inner, styles.two)}/>
      <div className={classnames(styles.inner, styles.three)}/>
    </div>
  );
}

export default PageLoading;
