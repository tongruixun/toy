import React from 'react';
import { NavLink } from "react-router-dom";
import {menu} from "@/config/config";
import styles from "./index.less"
import {AnSearch} from "@/components";


function NavBar() {
    const renderNav = (menuData) => {
        return menuData.map((item, index) => {
            if(item.hideMenu) return null;
            return <NavLink activeClassName="selected" exact={item.exact} key={index} to={item.path}><span
                className={`iconfont icon-${item.icon}`}/>&ensp;{item.title}</NavLink>
        })
    }
   return (
       <div className={styles.wrap}>
           <div className={styles.header}>

           </div>
           <div className={styles.navBar}>
               <div className={styles.search}>
                   <AnSearch />
               </div>
               <div className={styles.nav}>
                   {
                       renderNav(menu[0].routes)
                   }
               </div>
           </div>
       </div>
   )
}

export default NavBar;