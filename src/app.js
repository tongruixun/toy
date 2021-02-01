import React from "react";
import NavBar from "./layout/NavBar";
// import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/gradient-light.css';
import 'highlight.js/styles/rainbow.css';
import './fonts/iconfont.css'
import './app.css';

function App(props) {
    // let html = '';
    // data.forEach(item => {
    //     const {content} = item;
    //     html = `${html}<div class="post-wrap">${content}</div>`
    // })
    // return <div dangerouslySetInnerHTML={{__html: html.replace(/<pre>/g, "<pre class='hljs'>")}} />
    return <div className='app'>
        <NavBar />
        {props.children}
    </div>
}


export default App;