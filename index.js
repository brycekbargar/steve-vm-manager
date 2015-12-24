'use strict';

const Promise = require('bluebird');
const c_p = require('child_process');
const exec = Promise.promisify(c_p.exec);

module.exports = class VM {
  constructor() {
    this.isStarted = false;

    this.start = () => {
      return new Promise(resolve => {
        let chuck = c_p.spawn('chuck', ['--loop']);
        chuck.on('error', (err) =>
          console.log(`ChucK [error]: ${err}`));
        chuck.on('message', (msg) =>
          console.log(`ChucK: ${msg}`));
        setTimeout(() => {
          this.isStarted = true;
          resolve();
        }, 500);
      });
    };

    this.add = filePath => {
      if(!this.isStarted || !filePath) {
        return Promise.reject(new Error('The VM hasn\'t been started yet!'));
      }
      // Is this a gaping security vulnerability?
      return exec(`chuck --add ${filePath}`);
    };

    this.__setTestStarted = started => this.isStarted = started;
    this.__getTestStarted = () => this.isStarted;
  }
};
