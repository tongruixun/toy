import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import FunctionTest from '@/page/about/FunctionTest';
import DataEnter from '@/page/about/DataEnter';
import {PageLoading} from '@/components'
import styles from './index.less';

const {
  Header,
  Content,
  Footer,
  Sider
} = Layout;
const { SubMenu } = Menu;

const contentMap = {
  functionTest: <FunctionTest/>,
  dataEnter: <DataEnter/>,
  loading: <PageLoading />
};

function About() {

  const [collapsed, setCollapsed] = useState(false);
  const [curKey, setCurKey] = useState('loading');

  function onCollapse(collapsed) {
    setCollapsed(collapsed);
  }

  function onSelect(node) {
    setCurKey(node.key);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={styles.logo}/>
        <Menu onSelect={onSelect} theme="dark" defaultSelectedKeys={[curKey]} mode="inline">
          <SubMenu key="functionTest" icon={<UserOutlined/>} title="功能测试">
            <Menu.Item key="loading">加载状态</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <Menu.Item key="dataEnter" icon={<DesktopOutlined/>}>
            数据录入
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined/>} title="账号管理">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined/>} title="权限控制">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined/>}>
            文件管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}/>
        <Content style={{ margin: '16px' }}>
          {contentMap[curKey] ? contentMap[curKey] : null}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default About;
