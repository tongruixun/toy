import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { NavLogo, SpinPage } from '@/components';
import { aboutRoutes } from '@/router';
import {
  PieChartOutlined,
  UserOutlined
} from '@ant-design/icons';

const iconMap = {
  test: <PieChartOutlined/>,
  game: <UserOutlined/>
};

const {
  Header,
  Content,
  Footer,
  Sider
} = Layout;
const { SubMenu } = Menu;

function ProLayout(props) {

  const [collapsed, setCollapsed] = useState(false);
  const [curKey, setCurKey] = useState('');
  const [spinning, setSpinning] = useState(true);
  let history = useHistory();

  function onCollapse(collapsed) {
    setCollapsed(collapsed);
  }

  function onSelect(node) {
    history.push(node.key);
    setCurKey(node.key);
  }

  function renderMenu(menuConfig, path = '/record/page') {
    return menuConfig.map(item => {

      const navPath = `${path}${item.path}`

      if (item.routes) {
        return <SubMenu key={navPath} icon={iconMap[item.icon]} title={item.title}>
          {renderMenu(item.routes, navPath)}
        </SubMenu>;
      }

      return <Menu.Item key={navPath} icon={iconMap[item.icon]}>{item.title}</Menu.Item>;
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
          renderMenu(aboutRoutes)
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

export default ProLayout;
