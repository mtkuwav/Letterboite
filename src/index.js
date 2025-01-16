import Router from './router';
import ControllerListFilms from './Controllers/list-films';
import ControllerUsers from './Controllers/user';
import ControllerLogin from './Controllers/login';

import './index.scss';

const routes = [{
  url: '/login',
  controller: ControllerLogin
}, {
  url: '/list-films',
  controller: ControllerListFilms
}, {
  url: '/user',
  controller: ControllerUsers
}];

const token = localStorage.getItem('tmdb_token');
if (!token && window.location.pathname !== '/login') {
  window.location.href = '/login';
}

new Router(routes);
