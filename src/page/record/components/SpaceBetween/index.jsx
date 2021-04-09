import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ImportOutlined,
  ExportOutlined
} from '@ant-design/icons';
import styles from './index.less';

function SpaceBetween({
  add,
  update,
  remove,
  importOut,
  exportOut
}) {
  return <div className={styles.wrap}>
    <div>
      <Button className={styles.btn} onClick={add} icon={<PlusOutlined/>} type='primary'>新增</Button>
      <Button className={styles.btn} onClick={update} icon={<EditOutlined/>}>修改</Button>
      <Button className={styles.btn} onClick={remove} icon={<DeleteOutlined/>} danger>删除</Button>
      <Button className={styles.btn} onClick={importOut} icon={<ImportOutlined/>}>导入</Button>
      <Button className={styles.btn} onClick={exportOut} icon={<ExportOutlined/>}>导出</Button>
    </div>
    <div>
      <Button>更多操作</Button>
    </div>
  </div>;
}

export default SpaceBetween;

SpaceBetween.propTypes = {
  add: PropTypes.func,
  update: PropTypes.func,
  remove: PropTypes.func,
  importOut: PropTypes.func,
  exportOut: PropTypes.func,
};


