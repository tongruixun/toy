import React from "react";
import data from './data.json'
import Home from '@/page/home'
import 'highlight.js/styles/atom-one-dark.css';
import './app.css';
import './index.css';

function App() {
    // let html = '';
    // data.forEach(item => {
    //     const {content} = item;
    //     html = `${html}<div class="post-wrap">${content}</div>`
    // })
    // return <div dangerouslySetInnerHTML={{__html: html.replace(/<pre>/g, "<pre class='hljs'>")}} />
    return <div className='app'>
        <Home />
    </div>
}


export default App;