import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { themes } from '@/db';
import PostCard from '@/page/frontEnd/overview/postCard';
import { debounce } from '@/util/util';
import styles from './index.less';

import img1 from '@/asset/img/card/art-1.jpg';
import img2 from '@/asset/img/card/art-2.jpg';
import img3 from '@/asset/img/card/art-3.jpg';
import img4 from '@/asset/img/card/art-4.jpg';
import img5 from '@/asset/img/card/art-5.jpg';
import img6 from '@/asset/img/card/art-6.jpg';
import img7 from '@/asset/img/card/art-7.jpg';
import img8 from '@/asset/img/card/art-8.jpg';
import img9 from '@/asset/img/card/art-9.jpg';
import img10 from '@/asset/img/card/art-10.jpg';
import nature1 from '@/asset/img/card/nature1.jpg';
import nature2 from '@/asset/img/card/nature2.jpg';
import nature3 from '@/asset/img/card/nature3.jpg';
import nature4 from '@/asset/img/card/nature4.jpg';
import nature5 from '@/asset/img/card/nature5.jpg';
import nature6 from '@/asset/img/card/nature6.jpg';
import nature7 from '@/asset/img/card/nature7.jpg';
import nature8 from '@/asset/img/card/nature8.jpg';
import nature9 from '@/asset/img/card/nature9.jpg';
import nature10 from '@/asset/img/card/nature10.jpg';

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  nature1, nature2, nature3, nature4, nature5, nature6, nature7, nature8, nature9, nature10
];

function Card({
  children,
  index
}) {
  return <div className={styles.cardWrap} style={{ backgroundImage: `url(${images[index + 10]})` }}>
    <div className={styles.cardContent}>
      {children}
    </div>
  </div>;
}

function Overview() {

  const [navList, setNavList] = useState([]);
  const [page, setPage] = useState({
    pageSize: 10,
    pageNum: 1
  });
  const history = useHistory();

  let {
    type,
    queryValue
  } = useParams();

  const postInfoList = (list) => list
    .filter((item, index) =>
      index < page.pageSize * page.pageNum && index >= page.pageSize * page.pageNum - 10)
    .map(({
      data,
      id
    }, index) => (
      <Card key={index} index={index}><PostCard id={id} postInfo={data}/></Card>));

  useEffect(() => {
    let dataSource = themes;
    if (type === 'tag') {
      dataSource = dataSource.filter(({ data: { tags } }) => {
        if (Array.isArray(tags) && tags.includes(queryValue)) return true;
        return tags === queryValue;
      });
    }
    if (type === 'search') {
      dataSource = dataSource.filter(({ data: { title } }) => {
        return title.toUpperCase()
          .includes(queryValue.toUpperCase());
      });
    }
    const list = dataSource;
    setNavList(list);
  }, [page, queryValue]);

  const onPageChange = () => {
    const len = `${navList.length / 10}`;
    if (!(parseInt(len, 10) < 1)) {
      setPage(origin => {
        let pageNum = origin.pageNum + 1;
        if ((parseInt(len, 10) + 1) === page.pageNum) {
          pageNum = 1;
        }

        return ({
          ...origin,
          pageNum
        });
      });
    }
  };

  const onChange = debounce((value) => {
    console.log(value);
    history.push(`/frontEnd/search/${value}`);
  }, 500);

  return (
    <div className={styles.overView}>
      <div className={styles.pagination}>
        <input onChange={(e) => onChange(e.target.value)}/>
        <span style={{marginLeft: 24}} onClick={onPageChange}> NEXT --&gt;</span>
      </div>
      <div className={styles.contain}>
        {
          postInfoList(navList)
        }
        <i/><i/><i/><i/><i/>
      </div>
    </div>
  );
}

export default Overview;

Card.propTypes = {
  index: PropTypes.number
};
