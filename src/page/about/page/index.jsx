import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { NavLogo, SpinPage } from '@/components';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';

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
        key: '/about/page/loading',
        title: '加载状态'
      }
    ]
  }, {
    key: '/about/page/dataEnter',
    title: '数据录入',
    icon: <DesktopOutlined/>
  }, {
    key: 'sub1',
    title: '账号管理',
    icon: <UserOutlined/>,
    children: [
      {
        key: '/about/page/role',
        title: '角色管理'
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

function Page(props) {

  const [collapsed, setCollapsed] = useState(false);
  const [curKey, setCurKey] = useState('/about/page/role');
  const [spinning, setSpinning] = useState(true);
  let history = useHistory();

  function onCollapse(collapsed) {
    setCollapsed(collapsed);
  }

  function onSelect(node) {
    history.push(node.key);
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

  useEffect(() => {
    setSpinning(false);
  }, []);

  return <Layout style={{ minHeight: '100vh' }}>
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
          {props.children}
        </SpinPage>
      </Content>
      <Footer style={{ textAlign: 'center' }}>TOY Design ©2020 Created by TRX</Footer>
    </Layout>
  </Layout>;
}

export default Page;
