import React from 'react';
import {AnCard} from '@/components';
import styles from './index.less';

function Tags(props) {


    const renderTag = (tagList) => {
        return tagList.map((item, index) => {
            if(!item) return null;
            if (Array.isArray(item)) {
                return renderTag(item);
            }

            return <div key={index} className={styles.tagItem}>{item}</div>
        })
    }

    return <AnCard >
        <div className={styles.tags}>
            <div className={styles.tagsHeader}>
                <span className='iconfont icon-tags' />&ensp;<span className={styles.tagsTitle}>文章标签</span>
            </div>
            {renderTag(Array.from(new Set(props.tagList)))}
        </div>
    </AnCard>
}

export default Tags;