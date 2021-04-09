import React from 'react';
import styles from './index.less';
import { tags } from '@/db';

function Tags() {

  const colors = [
    '#a61b29',
    '#322f3b',
    '#61649f',
    '#1661ab',
    '#0eb0c9',
    '#869d9d',
    '#55bb8a',
    '#f9c116',
    '#bec936',
    '#440e25',
    '#36292f',
    '#1f2040',
    '#c08eaf',
    '#8076a3',
    '#835e1d'
  ];

  return <div className={styles.tags}>
    {
      tags.map((tag, index) => {
        const random = Math.floor(Math.random() * 15);
        return <span key={index} style={{ backgroundColor: colors[random] }}>
                    {tag}
                </span>;
      })
    }
  </div>;
}

export default Tags;
