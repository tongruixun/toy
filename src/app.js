import React from "react";
import NavBar from "./layout/NavBar";
// import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/gradient-light.css';
import 'highlight.js/styles/rainbow.css';
import './styles/fonts/iconfont.css'
import './app.css';

function App(props) {

    return <div className='app' onScroll={e => console.log(e)}>
        <NavBar />
        {props.children}
    </div>
}


export default App;