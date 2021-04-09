import React, { Suspense, lazy } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { PageLoading } from '@/components';

const recordPath = '/page/record';

const routes = [
  {
    title: '主页',
    path: '/',
    exact: true,
    component: '/page/home',
  }, {
    title: '前端技术',
    path: '/frontEnd',
    component: '/page/frontEnd',
    routes: [
      {
        title: '全文',
        path: '/postDetail/:id',
        component: '/page/frontEnd/postDetail',
      }, {
        title: '总览',
        path: '',
        component: '/page/frontEnd/overview',
        exact: true
      }
    ]
  }, {
    title: 'ABOUT',
    path: '/record',
    component: '/page/record',
    routes: [
      {
        title: '数据管理',
        path: '/page',
        component: '/layout/ProLayout',
        routes: [
          {
            title: '功能测试',
            path: '/test',
            component: '/layout/BasicLayout',
            icon: 'test',
            routes: [
              {
                title: '加载状态',
                path: '/loading',
                component: '@r/page/test/Loading',
              },
              {
                title: '数据录入',
                path: '/dataEnter',
                component: '@r/page/test/DataEnter',
              },
            ]
          },
          {
            title: '角色管理',
            path: '/game',
            icon: 'game',
            component: '/layout/BasicLayout',
            routes: [
              {
                title: '角色管理',
                path: '/role',
                component: '@r/page/game/Role',
              },
            ]
          }
        ]
      },
      {
        title: '登录',
        path: '/login',
        component: '@r/Login',
      },
    ]
  }, {
    path: '*',
    component: '/layout/404'
  }
];

export const aboutRoutes = routes.filter(item => item.path === '/record')[0].routes.filter(item => item.path === '/page')[0].routes;

function BasicRouter() {
  function renderRoute(routesConfig, routePath = '') {
    return routesConfig.map((item) => {
      // 递归层级拼接路由路径和组件路径
      const rPath = `${routePath}${item.path}`;
      const cPath = item.component.replace('@r', recordPath);

      // 引入组件 懒加载
      const Comp = lazy(() => import('.' + cPath));
      return <Route exact={item.exact} key={item.path} path={rPath}>
        <Comp>
          {
            item.routes && renderRoute(item.routes, rPath)
          }
        </Comp>
      </Route>;
    });
  }

  return <Router>
    <Suspense fallback={<PageLoading/>}>
      <Switch>
        {
          renderRoute(routes)
        }
      </Switch>
    </Suspense>
  </Router>;
}

export default BasicRouter;
