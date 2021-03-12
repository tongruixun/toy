import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {themes} from "@/db";
import PostCard from "@/page/frontEnd/overview/postCard";
import {AnPagination} from "@/components"
import styles from "./index.less";


function Overview() {
    const postInfoList = (list) => list.map(({data, id}) => <PostCard key={id} id={id} postInfo={data}/>)

    const [navList, setNavList] = useState([]);
    const [page, setPage] = useState({pageSize: 10, pageNum: 1});
    let { type, queryValue } = useParams();
    useEffect(() => {
        let dataSource = themes;
        if(type === 'tag') {
            dataSource = dataSource.filter(({data: {tags}}) => {
                if (Array.isArray(tags) && tags.includes(queryValue)) return true;
                return tags === queryValue;
            })
        }
        if(type === 'search') {
            dataSource = dataSource.filter(({data: {title}}) => {
                return title.toUpperCase().includes(queryValue.toUpperCase());
            })
        }
        const list = dataSource.filter((item, index) => index < page.pageSize*page.pageNum && index >= page.pageSize*page.pageNum - 10);
        setNavList(list);
    }, [page, queryValue])

    const onPageChange = (pageNum) => {
        setPage({...page, pageNum})
    }

    return (
        <div className={styles.overView}>
            <AnPagination onChange={onPageChange} total={navList.length} current={page.pageNum} />
            {
                postInfoList(navList)
            }
            <AnPagination onChange={onPageChange} total={navList.length} current={page.pageNum} />
        </div>
    )
}

export default Overview;