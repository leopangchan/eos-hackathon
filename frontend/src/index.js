import React from 'react';
import ReactDOM from 'react-dom';
import { UIRouter, UIView, pushStateLocationPlugin } from '@uirouter/react';
import Index from './pages/publisher';
import User from './pages/user'

// define your states
const states = [
  {
    name: 'publisher',
    url: '/publisher',
    component: Index,
  },
  {
    name: "user",
    url: "/user",
    component: User
  },
  {
    name: "home",
    url: "/",
    component: Index
  }
];

// select your plugins
const plugins = [pushStateLocationPlugin];

ReactDOM.render(
  <UIRouter plugins={plugins} states={states}>
    <UIView />
  </UIRouter>,
  document.getElementById('root'),
);