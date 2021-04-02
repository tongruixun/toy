import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import FunctionTest from '@/page/about/FunctionTest';
import DataEnter from '@/page/about/DataEnter';
import { PageLoading, SpinPage, NavLogo } from '@/components';

const {
  Header,
  Content,
  Footer,
  Sider
} = Layout;
const { SubMenu } = Menu;

const menu = [
  {
    key: 'functionTest',
    title: '功能测试',
    icon: <PieChartOutlined/>,
    children: [
      {
        key: 'loading',
        title: '加载状态'
      }
    ]
  }, {
    key: 'dataEnter',
    title: '数据录入',
    icon: <DesktopOutlined/>
  }, {
    key: 'sub1',
    title: '账号管理',
    icon: <UserOutlined/>,
    children: [
      {
        key: 'sub11',
        title: 'sub11'
      }, {
        key: 'sub12',
        title: 'sub12'
      }, {
        key: 'sub13',
        title: 'sub13'
      }
    ]
  }, {
    key: 'sub2',
    title: '权限控制',
    icon: <TeamOutlined/>,
    children: [
      {
        key: 'sub21',
        title: 'sub21'
      }, {
        key: 'sub22',
        title: 'sub22'
      }
    ]
  }, {
    key: 'sub3',
    title: '文件管理',
    icon: <FileOutlined/>
  }
];

const contentMap = {
  functionTest: <FunctionTest/>,
  dataEnter: <DataEnter/>,
  loading: <PageLoading/>
};

function About() {

  const [collapsed, setCollapsed] = useState(false);
  const [curKey, setCurKey] = useState('dataEnter');
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    setSpinning(false);
  }, []);

  function onCollapse(collapsed) {
    setCollapsed(collapsed);
  }

  function onSelect(node) {
    setCurKey(node.key);
  }

  function renderMenuNode(menuNode) {
    return menuNode.map(item => {

      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {renderMenuNode(item.children)}
          </SubMenu>
        );
      }

      return <Menu.Item key={item.key} icon={item.icon}>{item.title}</Menu.Item>;
    });
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div style={{ width: 200 }}>
          <NavLogo/>
        </div>
        <Menu onSelect={onSelect} theme="dark" defaultSelectedKeys={[curKey]} mode="inline">
          {
            renderMenuNode(menu)
          }
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}/>
        <Content style={{ margin: '16px' }}>
          <SpinPage spinning={spinning}>
            {contentMap[curKey] ? contentMap[curKey] : null}
          </SpinPage>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default About;
