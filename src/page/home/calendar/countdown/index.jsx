import React from 'react';
import styles from './index.less';

function Countdown({ countdowns }) {
  return (
    <div>
      {
        countdowns.map(({
          title,
          remainingDays,
          endTime,
          unit,
        }) => (
          <div key={title + endTime} className={styles.countdown}>
            <div className={styles.info}>
              <strong className={styles.text}>
                距离
                <span className={styles.title}>{title}</span>
                还有
              </strong>
              <em className={styles.endTime}>
                {endTime.date}
                &ensp;
                {endTime.week}
              </em>
            </div>
            <div className={styles.remaining}>
              {remainingDays}
              <sup className={styles.sup}>{unit}</sup>
            </div>
          </div>
        ))
      }

    </div>
  );
}

export default Countdown;
