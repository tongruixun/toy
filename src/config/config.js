import React from 'react'
import App from '../app'
import Home from "../page/home";
import FrontEnd from "../page/frontEnd";
import About from "../page/about";
import PostDetail from "../page/frontEnd/postDetail";
import Overview from "../page/frontEnd/Overview";

function parseMenu(routes) {
    return routes.map(item => {
        let result = {...item};
        if (item.routes) result.routes = parseMenu(item.routes);
        return result
    })
}

const config = {
    routes: [
        {
            title: '主页',
            path: '/',
            component: App,
            routes: [
                {
                    title: '网站首页',
                    path: '/',
                    icon: 'home',
                    exact: true,
                    component: Home,
                },{
                    title: '前端技术',
                    path: '/frontEnd',
                    icon: 'FE',
                    component: FrontEnd,
                    routes: [
                        {
                            title: '前端技术1',
                            path: '/frontEnd/postDetail/:id',
                            icon: 'FE',
                            component: PostDetail
                        },{
                            title: '前端技术2',
                            path: '/frontEnd',
                            icon: 'FE',
                            component: Overview
                        }
                    ]
                },{
                    title: 'ABOUT',
                    path: '/about',
                    icon: 'aboutme',
                    component: About,
                },{
                    path: '/postDetail/:id',
                    component: PostDetail,
                    hideMenu: true,
                }
            ]
        }
    ]
}

export const menu = parseMenu(config.routes);

export default config;