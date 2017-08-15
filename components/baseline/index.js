require('./index.scss');

import baselineTemplate from './index.html';

export default {
  bindings  : {
    orientation: '<'
  },
  template  : baselineTemplate,
  controller: baselineConbtroller
};

function baselineConbtroller(){
  'ngInject';
}