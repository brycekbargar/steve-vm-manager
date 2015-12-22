'use strict';
const stub = require('sinon').stub;
const expect = require('chai')
  .use(require('sinon-chai'))
  .use(require('chai-as-promised'))
  .expect;

const c_p = require('child_process');

const VM = require('./../index.js');

describe('For the ChucK VM', () => {
  beforeEach('Setup Spies', () => {
    this.spawnStub = stub(c_p, 'spawn');
  });
  afterEach('Teardown Spies', () => {
    c_p.spawn.restore();
  });
  beforeEach('Setup VM', () => {
    this.chuck = new VM();
  });
  describe('when .start() is called', () => {
    it('expect it to resolve', () => {
      let start = this.chuck.start();
      return expect(start).to.be.fulfilled;
    });
    it('expect it spawn a ChucK vm', () => {
      this.chuck.start();
      expect(this.spawnStub).to.have.been.calledWith('chuck', ['--loop']);
    });
  });
  describe('when .add() is called', () => {
    it('expect it to be reject if the VM isn\'t started', () => {
      let add = this.chuck.add();
      return expect(add).to.be.rejected;
    });
  });
});
