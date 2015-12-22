'use strict';

const Promise = require('bluebird');
const c_p = require('child_process');

module.exports = class VM {
  start() {
    return new Promise(resolve => {
      c_p.spawn('chuck', ['--loop']);
      setTimeout(resolve, 500);
    });
  }

  add() {
    return Promise.reject();
  }
};
