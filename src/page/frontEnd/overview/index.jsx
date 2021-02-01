import React from 'react';
import posts from "@/db/data.json";
import PostCard from "@/page/frontEnd/postCard";
import styles from "./index.less";

function Overview() {
    const postInfoList = () => posts.map(({data, id}) => <PostCard key={id} id={id} postInfo={data}/>)

    return (
        <div className={styles.overView}>
            {
                postInfoList()
            }
        </div>
    )
}

export default Overview;