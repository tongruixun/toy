import React from 'react';
import {Link} from "react-router-dom";
import styles from './index.less'

function AnTagsLink({tags}) {

    const renderTags = curTags => {
        if(!curTags) return null;
        if(Array.isArray(curTags)) {
            return curTags.map((item, index) => <span key={index}>{renderTags(item)}</span>)
        }
        return <Link to={`/frontEnd/tag/${curTags}`}>{curTags.toLocaleUpperCase()}&ensp;</Link>
    }

    return <div className={styles.tags}>标签:&ensp;{renderTags(tags)}</div>
}

export default AnTagsLink;