import Router from './router';
import ControllerPopularFilms from './Controllers/popular-films';
import ControllerFilm from './Controllers/film';
import ControllerLogin from './Controllers/login';
import ControllerListsFilms from './Controllers/lists-films';

import './index.scss';

const routes = [{
  url: '/',
  controller: ControllerLogin
}, {
  url: '/login',
  controller: ControllerLogin
}, {
  url: '/popular-films',
  controller: ControllerPopularFilms
}, {
  url: '/film',
  controller: ControllerFilm
}, {
  url: '/lists-films',
  controller: ControllerListsFilms
}];

const token = localStorage.getItem('tmdb_token');
if (!token && window.location.pathname !== '/login') {
  window.location.href = '/login';
}

new Router(routes);
