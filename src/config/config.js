function parseMenu(routes) {
  return routes.map(item => {
    let result = { ...item };
    if (item.routes) result.routes = parseMenu(item.routes);
    return result;
  });
}

const config = {
  routes: [
    {
      title: '主页',
      path: '/',
      component: '/app',
      routes: [
        {
          title: '网站首页',
          path: '/',
          icon: 'home',
          exact: true,
          component: '/page/home',
        }, {
          title: '前端技术',
          path: '/frontEnd',
          icon: 'FE',
          component: '/page/frontEnd',
          routes: [
            {
              title: '全文',
              path: '/frontEnd/postDetail/:id',
              icon: 'FE',
              component: '/page/frontEnd/postDetail',
            }, {
              title: '总览',
              path: '/frontEnd/:type/:queryValue',
              icon: 'FE',
              component: '/page/frontEnd/overview',
            }, {
              title: '总览',
              path: '/frontEnd',
              icon: 'FE',
              exact: true,
              component: '/page/frontEnd/overview',
            }
          ]
        }, {
          title: 'ABOUT',
          path: '/about',
          icon: 'aboutme',
          component: '/page/about',
          routes: [
            {
              title: '数据录入',
              path: '/about/enter',
              icon: 'aboutme',
              component: '/page/about/DataEnter',
            }, {
              title: '功能测试',
              path: '/about',
              icon: 'aboutme',
              component: '/page/about/FunctionTest',
            }
          ]
        }
      ]
    }
  ]
};

export const menu = parseMenu(config.routes);

export default config;
