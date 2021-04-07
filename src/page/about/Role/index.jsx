import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table, Space, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import SpaceBetween from '@/page/about/components/SpaceBetween';
import CustomModal from '@/page/about/components/CustomModal';
import * as api from './service';
import styles from './index.less';

function Role() {

  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState({});

  function onCancel() {
    form.resetFields();
    setVisible(false);
    setRow({});
  }

  function removeRole(id) {
    api.removeRole(id)
      .then(() => {
        getRoles();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getRoles() {
    api.roles()
      .then(data => {
        setDataSource(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function editRole(records) {
    setRow(records);
    setVisible(true);
  }

  function handleSubmit(values) {
    const isEdit = values.id || values.id === 0;
    const promise = isEdit ? api.updateRole(values) : api.addRole(values);
    promise.then(
      () => {
        getRoles();
        onCancel();
      })
      .catch(err => {
        console.log(err);
      });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    }, {
      title: '昵称',
      dataIndex: 'nickname',
    }, {
      title: '门派',
      dataIndex: 'guild'
    }, {
      title: '角色',
      dataIndex: 'role'
    }, {
      title: '账号',
      dataIndex: 'account'
    }, {
      title: '等级',
      dataIndex: 'level'
    }, {
      title: '操作',
      render: function render(text, records) {
        return <Space>
          <Button onClick={() => editRole(records)}>编辑</Button>
          <Popconfirm
            placement="topLeft"
            title="删除此条数据?"
            onConfirm={() => removeRole(records.id)}
            okText="确定"
            cancelText="取消">
            <Button danger>删除</Button>
          </Popconfirm>
          <Button>更多操作</Button>
        </Space>;
      }
    }
  ];

  useEffect(() => {
    getRoles();
  }, []);

  function onOk() {
    form.submit();
  }

  function add() {
    setVisible(true);
  }

  return <div className={styles.wrap}>
    <SpaceBetween add={add}/>
    <Table rowKey='id' columns={columns} dataSource={dataSource}/>
    <RoleModal
      form={form}
      visible={visible}
      row={row}
      onOk={onOk}
      onCancel={onCancel}
      handleSubmit={handleSubmit}
      isEdit={!!(row.id || row.id === 0)}
    />
  </div>;
}

export default Role;

function RoleModal({
  visible,
  onOk,
  onCancel,
  form,
  handleSubmit,
  row,
  isEdit
}) {

  useEffect(() => {
    if (row.id || row.id === 0) {
      form.setFieldsValue(row);
    }
  }, [row]);

  function onFinish(values) {
    const params = {
      ...row, ...values
    };
    handleSubmit(params);
  }

  return <CustomModal
    title={isEdit ? '编辑角色' : '添加角色'}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
  >
    <Form form={form} onFinish={onFinish}>
      <Form.Item label="账号" name='account' rules={[{
        required: true,
        message: '请输入账号'
      }]}>
        <Input/>
      </Form.Item>
      <Form.Item label="昵称" name='nickname' rules={[{
        required: true,
        message: '请输入昵称'
      }]}>
        <Input/>
      </Form.Item>
      <Form.Item label="门派" name='guild' rules={[{
        required: true,
        message: '请输入门派'
      }]}>
        <Input/>
      </Form.Item>
      <Form.Item label="角色" name='role' rules={[{
        required: true,
        message: '请输入角色'
      }]}>
        <Input/>
      </Form.Item>
      <Form.Item label="等级" name='level' rules={[{
        required: true,
        message: '请输入等级'
      }]}>
        <Input/>
      </Form.Item>
    </Form>
  </CustomModal>;
}

RoleModal.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.object,
  handleSubmit: PropTypes.func,
  row: PropTypes.object,
  isEdit: PropTypes.bool
};
