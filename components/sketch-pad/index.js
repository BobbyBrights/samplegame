require('./index.scss');

import sketchPad from './index.html';
import sketchController from './controller';

export default {
  bindings  : {
    params: '<',
    bindSketchPad: '&'
  },
  template  : sketchPad,
  controller: sketchController
};
