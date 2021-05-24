import React, { useEffect, useState } from 'react';
import dataRequest from '@/util/request';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Divider,
  message,
  Tabs,
  Spin, Radio
} from 'antd';
import TokenUtils from '@/util/token';
import { deviceApi } from '../../../service';
import 'antd/dist/antd.css';
import styles from './index.less';
import Terminal from './Terminal';
import Sensor from './Sensor';
import MonitorPoint from './MonitorPoint';

const { TabPane } = Tabs;

const loginCode = {
  0: '请先登录',
  1: '已登录',
  2: '登录态过期'
};

function DataEnter() {

  const [loginForm] = Form.useForm();
  const [projectId, setProjectId] = useState('');
  const [baseTerminals, setBaseTerminals] = useState({});
  const [loginStatus, setLoginStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  function getBaseTerminals() {
    deviceApi.getBaseTerminals()
      .then(({ data }) => {
        setBaseTerminals(data);
      })
      .catch(err => {
        setLoginStatus(0);
        message.error(err.message);
      });
  }

  function handleLogin(values) {
    TokenUtils.setToken(values.token);
    // 改变axios实例的baseURL
    dataRequest.defaults.baseURL = values.baseUrl;
    setLoginStatus(1);
    setProjectId(values.projectId);
    if (TokenUtils.getToken() && values.baseUrl) {
      getBaseTerminals();
    }
  }

  useEffect(() => {
    if (TokenUtils.getToken()) {
      setLoginStatus(1);
    }
  }, []);

  return <Spin spinning={loading}>
    <div className={styles.wrap}>
      <BaseConfig
        form={loginForm}
        onFinish={handleLogin}
        loginStatus={loginStatus}
        projectId={projectId}
        initialValues={{
          baseUrl: 'http://gateway.zdjcyun.com',
          token: 'd5f4d209-8940-4e31-a26a-257a0938f8db',
          projectId: 'PR2021042900008'
        }}/>
      <Divider/>
      <Tabs defaultActiveKey="1">
        <TabPane tab="添加终端" key="1">
          <Terminal
            setLoading={setLoading}
            projectId={projectId}
            baseTerminals={baseTerminals}
          />
        </TabPane>
        <TabPane tab="添加传感器" key="2">
          <Sensor
            setLoading={setLoading}
            projectId={projectId}
          />
        </TabPane>
        <TabPane tab="添加测点" key="3">
          <MonitorPoint
            setLoading={setLoading}
            projectId={projectId}
          />
        </TabPane>
      </Tabs>
    </div>
  </Spin>;
}

export default DataEnter;

function BaseConfig(props) {
  const {
    form,
    onFinish,
    initialValues,
    loginStatus,
    projectId
  } = props;
  return <Form
    form={form}
    onFinish={onFinish}
    layout="inline"
    initialValues={initialValues}
  >
    <Form.Item
      label="后台环境"
      name="baseUrl"
      rules={[{
        required: true,
        message: '请输入环境地址'
      }]}
    >
      <Radio.Group
        options={
          [{
            label: '测试',
            value: 'http://192.168.10.3:9527'
          }, {
            label: '预发',
            value: 'http://192.168.10.65:9527'
          }, {
            label: '正式',
            value: 'http://gateway.zdjcyun.com'
          }]}
      />
    </Form.Item>
    <Form.Item
      label="token"
      name="token"
      rules={[{
        required: true,
        message: 'token'
      }]}>
      <Input style={{ width: 300 }} placeholder="token"/>
    </Form.Item>
    <Form.Item
      label="项目ID"
      name="projectId"
      rules={[{
        required: true,
        message: '请输入projectId'
      }]}
    >
      <Input placeholder="项目ID"/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" type="primary">设置配置项</Button>
    </Form.Item>
    <Form.Item>
      当前登录状态: <strong
      style={{ color: loginStatus === 1 ? 'black' : 'red' }}>{loginCode[loginStatus]}</strong>
    </Form.Item>
    <Form.Item>
      当前项目ID: <strong
      style={{ color: projectId ? 'black' : 'red' }}>{projectId ? projectId : '需设置项目id'}</strong>
    </Form.Item>
  </Form>;
}

BaseConfig.propTypes = {
  form: PropTypes.object,
  onFinish: PropTypes.func,
  initialValues: PropTypes.object,
  loginStatus: PropTypes.number,
  projectId: PropTypes.string,
};
