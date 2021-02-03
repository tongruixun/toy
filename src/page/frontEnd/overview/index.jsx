import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {themes} from "@/db";
import PostCard from "@/page/frontEnd/postCard";
import {AnPagination} from "@/components"
import styles from "./index.less";


function Overview() {
    const postInfoList = (list) => list.map(({data, id}) => <PostCard key={id} id={id} postInfo={data}/>)

    const [navList, setNavList] = useState([]);
    const [page, setPage] = useState({pageSize: 10, pageNum: 1});
    let { tag } = useParams();
    useEffect(() => {
        let dataSource = themes;
        if(tag) {
            dataSource = dataSource.filter(({data: {tags}}) => {
                if (Array.isArray(tags) && tags.includes(tag)) return true;
                return tags === tag;
            })
        }
        const list = dataSource.filter((item, index) => index < page.pageSize*page.pageNum && index >= page.pageSize*page.pageNum - 10);
        setNavList(list);
    }, [page, tag])

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