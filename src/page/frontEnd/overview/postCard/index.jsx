import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AnTagsLink } from '@/components';
import { formatDate } from '@/util/util';
import styles from './index.less';

function PostCard({
  postInfo,
  id
}) {

  const {
    title,
    date,
    tags
  } = postInfo;

  return <div className={styles.introduction}>
    <div className={styles.info}>
      <div className={styles.title}>
        <Link to={`/frontEnd/postDetail/${id}`}>{title}</Link>
      </div>
      <AnTagsLink tags={tags}/>
      <div className={styles.time}>{formatDate(date)}</div>
    </div>
  </div>;
}

export default PostCard;

PostCard.propTypes = {
  postInfo: PropTypes.object,
  id: PropTypes.any
};
