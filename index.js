'use strict';

const Promise = require('bluebird');
const c_p = require('child_process');
const exec = Promise.promisify(c_p.exec);

module.exports = class VM {
  constructor() {
    this.isStarted = false;

    this.start = () => {
      return new Promise(resolve => {
        c_p.spawn('chuck', ['--loop']);
        setTimeout(() => {
          this.isStarted = true;
          resolve();
        }, 500);
      });
    };

    this.add = filePath => {
      if(!this.isStarted || !filePath) {
        return Promise.reject();
      }
      // Is this a gaping security vulnerability?
      return exec(`chuck --add ${filePath}`);
    };

    this.__setTestStarted = started => this.isStarted = started;
    this.__getTestStarted = () => this.isStarted;
  }
};
