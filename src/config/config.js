import React from 'react'
import App from '../app'
import Home from "../page/home";
import About from "../page/about";
import PostDetail from "../page/home/postDetail";

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
                    title: '首页',
                    path: '/home',
                    icon: 'home',
                    component: Home,
                },{
                    title: 'about',
                    path: '/about',
                    icon: 'aboutme',
                    component: About,
                },{
                    title: '首页',
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