import Router from './router';
import ControllerListUsers from './Controllers/list-users';
import ControllerUsers from './Controllers/user';

import './index.scss';

const routes = [{
  url: '/list-users',
  controller: ControllerListUsers
}, {
  url: '/user',
  controller: ControllerUsers
}];

new Router(routes);
