require('./index.scss');

import scoreboard from './index.html';
import scoreboardController from './controller';

export default {
  bindings  : {
    params: '<',
    bindScoreboard: '&'
  },
  template  : scoreboard,
  controller: scoreboardController
};
