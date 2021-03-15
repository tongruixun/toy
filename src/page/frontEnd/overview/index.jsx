import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {themes} from "@/db";
import PostCard from "@/page/frontEnd/overview/postCard";
import {AnPagination} from "@/components"
import styles from "./index.less";

import img1 from "@/asset/img/card/art-1.jpg"
import img2 from "@/asset/img/card/art-2.jpg"
import img3 from "@/asset/img/card/art-3.jpg"
import img4 from "@/asset/img/card/art-4.jpg"
import img5 from "@/asset/img/card/art-5.jpg"
import img6 from "@/asset/img/card/art-6.jpg"
import img7 from "@/asset/img/card/art-7.jpg"
import img8 from "@/asset/img/card/art-8.jpg"
import img9 from "@/asset/img/card/art-9.jpg"
import img10 from "@/asset/img/card/art-10.jpg"

const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10
]

function Card({children, index}) {
    return <div className={styles.cardWrap} style={{backgroundImage: `url(${images[index]})`}}>
        <div className={styles.cardContent}>
            {children}
        </div>
    </div>
}


function Overview() {
    const postInfoList = (list) => list
        .filter(
            (item, index) =>
                index < page.pageSize * page.pageNum && index >= page.pageSize * page.pageNum - 10)
        .map(({data, id}, index) =>
            <Card key={index} index={index}><PostCard id={id} postInfo={data}/></Card>)

    const [navList, setNavList] = useState([]);
    const [page, setPage] = useState({pageSize: 10, pageNum: 1});
    let {type, queryValue} = useParams();
    useEffect(() => {
        let dataSource = themes;
        if (type === 'tag') {
            dataSource = dataSource.filter(({data: {tags}}) => {
                if (Array.isArray(tags) && tags.includes(queryValue)) return true;
                return tags === queryValue;
            })
        }
        if (type === 'search') {
            dataSource = dataSource.filter(({data: {title}}) => {
                return title.toUpperCase().includes(queryValue.toUpperCase());
            })
        }
        const list = dataSource;
        setNavList(list);
        console.log(dataSource.length);
        console.log(list.length);
    }, [page, queryValue])

    const onPageChange = (pageNum) => {
        setPage({...page, pageNum})
    }

    return (
        <div className={styles.overView}>
            <AnPagination onChange={onPageChange} total={navList.length} current={page.pageNum}/>
            {
                postInfoList(navList)
            }
            <AnPagination onChange={onPageChange} total={navList.length} current={page.pageNum}/>
        </div>
    )
}

export default Overview;