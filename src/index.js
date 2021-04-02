import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
// import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/gradient-light.css';
import 'highlight.js/styles/rainbow.css';
import './styles/fonts/iconfont.css';
import './app.css';

ReactDOM.render(
  <Router/>,
  document.getElementById('root')
);
