'use strict';

const Promise = require('bluebird');
const c_p = require('child_process');

module.exports = class VM {
  constructor() {
    this.isStarted = false;

    this.start = () => {
      return new Promise(resolve => {
        c_p.spawn('chuck', ['--loop']);
        setTimeout(resolve, 500);
      });
    };

    this.add = filePath => {
      if(!this.isStarted || !filePath) {
        return Promise.reject();
      }
      return Promise.resolve();
    };

    this.__setTestStarted = started => this.isStarted = started;
    this.__getTestStarted = () => this.isStarted;
  }
};
