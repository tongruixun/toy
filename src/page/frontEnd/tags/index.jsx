import React from 'react';
import {AnCard} from '@/components';
import styles from './index.less';

function Tags(props) {


    const renderTag = (tagList) => {
        return tagList.map((item, index) => {
            if (Array.isArray(item)) {
                return renderTag(item);
            }

            return <div key={index} className={styles.tagItem}>{item}</div>
        })
    }

    return <AnCard >
        <div className={styles.tags}>
            {renderTag(props.tagList)}
        </div>
    </AnCard>
}

export default Tags;