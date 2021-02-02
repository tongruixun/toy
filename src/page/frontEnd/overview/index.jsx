import React, {useState, useEffect} from 'react';
import posts from "@/db/data.json";
import PostCard from "@/page/frontEnd/postCard";
import {AnPagination} from "@/components"
import styles from "./index.less";

const themes = posts.map(({data, id}) => ({data, id}));

function Overview() {
    const postInfoList = (list) => list.map(({data, id}) => <PostCard key={id} id={id} postInfo={data}/>)

    const [navList, setNavList] = useState([]);
    const [page, setPage] = useState({pageSize: 10, pageNum: 1});

    useEffect(() => {
        const list = themes.filter((item, index) => index < page.pageSize*page.pageNum && index >= page.pageSize*page.pageNum - 10);
        setNavList(list);
    }, [page])

    const onPageChange = (pageNum) => {
        setPage({...page, pageNum})
    }

    return (
        <div className={styles.overView}>
            <AnPagination onChange={onPageChange} total={themes.length} current={page.pageNum} />
            {
                postInfoList(navList)
            }
            <AnPagination onChange={onPageChange} total={themes.length} current={page.pageNum} />
        </div>
    )
}

export default Overview;