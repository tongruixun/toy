import React from "react";
// import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/gradient-light.css';
import {NavMenu} from '@/components'
import 'highlight.js/styles/rainbow.css';
import './styles/fonts/iconfont.css'
import './app.css';

function App(props) {

    return <div className='app'>
        {props.children}
        <NavMenu />
    </div>
}


export default App;
