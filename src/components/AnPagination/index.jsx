import React from 'react';
import styles from './index.less'

function AnPagination(props) {
    const {total = 0, current, onChange} = props;
    return (
        <div className={styles.pagination}>
            {
                total? <>
                    <div className={styles.pageIcon}>
                        {
                            current > 1 && <>
                                <span onClick={()=>onChange(1)} className='iconfont icon-diyibu'/>
                                <span onClick={()=>onChange(current - 1)} className='iconfont icon-shangyibu'/>
                            </>
                        }
                    </div>
                    <div className={styles.num}>
                        {current}
                    </div>
                    <div className={styles.pageIcon}>
                        {
                            current <  parseInt(total/10, 10) + 1 && <>
                                <span onClick={()=>onChange(current + 1)} className='iconfont icon-xiayibu'/>
                                <span onClick={()=>onChange(parseInt(total/10, 10) + 1)} className='iconfont icon-zuihouyibu'/>
                            </>
                        }
                    </div>
                </> : null
            }
        </div>
    )
}

export default AnPagination;