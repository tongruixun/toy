import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Space } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './index.less';

function ItemInput(props) {
  const {
    label,
    ...restProps
  } = props;
  return <Form.Item label={label} {...restProps}>
    <Input style={{ width: 240 }}/>
  </Form.Item>;
}

ItemInput.propTypes = {
  label: PropTypes.string
};

function ExpandableSearch(props) {

  const { search } = props;
  const [expand, setExpand] = useState('展开');

  function renderSearch() {
    return search.map((item, index) => {
      if (expand === '展开' && index > 2) return null;
      return <ItemInput key={item.name} {...item}/>;
    });
  }

  function renderEmptyTag() {
    let len = search.length;
    if (expand === '展开' && len > 2) return null;
    let num = 3 - (len % 4);
    return search.map((_, index) => {
      let key = index + num;
      if (index < num) {
        return <i key={key}/>;
      }
      return null;
    });
  }

  function onFinish(values) {
    console.log(values);
  }

  return <Form onFinish={onFinish} layout='inline' className={styles.formWrap}>
    {
      renderSearch()
    }
    {
      renderEmptyTag()
    }
    <Space className={styles.handleBtn}>
      <Button htmlType='submit'>查询</Button>
      <Button>重置</Button>
      <Button
        type='link'
        onClick={() => {
          setExpand(expand === '收起' ? '展开' : '收起');
        }}
      >
        {expand} {expand === '收起' ? <UpOutlined/> : <DownOutlined/>}
      </Button>
    </Space>
  </Form>;
}

ExpandableSearch.propTypes = {
  search: PropTypes.arrayOf(PropTypes.object)
};

function Home() {

  const search = [
    {
      name: 'tag1',
      label: '公司标签1'
    },
    {
      name: 'tag2',
      label: '公司标签2'
    },
    {
      name: 'tag3',
      label: '公司标签3'
    },
    {
      name: 'tag4',
      label: '公司标签4'
    },
    {
      name: 'tag5',
      label: '公司标签5'
    },
    {
      name: 'tag6',
      label: '公司标签6'
    }
  ];

  return <ExpandableSearch search={search}/>;
}

export default Home;
