'use strict';
const proxyquire = require('proxyquire').noCallThru();
const Promise = require('bluebird');
const stub = require('sinon').stub;
require('sinon-as-promised')(Promise);
const expect = require('chai')
  .use(require('sinon-chai'))
  .use(require('chai-as-promised'))
  .expect;

const c_p = require('child_process');

const proxyquireStubs = {
  'child_process': c_p,
  bluebird: Promise
};

describe('For the ChucK VM', () => {
  beforeEach('Setup Spies', () => {
    (this.promisifyStub = stub(Promise, 'promisify')).returns(this.execStub = stub());
    this.execStub.resolves();
    this.spawnStub = stub(c_p, 'spawn');
    this.spawnStub.returns({ on: () => {} });
  });
  afterEach('Teardown Spies', () => {
    Promise.promisify.restore();
    c_p.spawn.restore();
  });
  beforeEach('Setup VM', () => {
    let VM = proxyquire('./../index.js', proxyquireStubs);
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
    it('expect it be started', () => {
      let start = this.chuck.start();
      return start.then(() => expect(this.chuck.__getTestStarted()).to.be.ok);
    });
  });
  describe('when .add() is called', () => {
    beforeEach('Start vm', () => {
      this.chuck.__setTestStarted(true);
    });
    it('expect it to be rejected if the VM isn\'t started', () => {
      this.chuck.__setTestStarted(false);
      let add = this.chuck.add('some file');
      return expect(add).to.be.rejected;
    });
    it('expect it to be rejected if the filePath is empty', () => {
      let add = this.chuck.add();
      return expect(add).to.be.rejected;
    });
    it('expect it to resolve', () => {
      let add = this.chuck.add('some file');
      return expect(add).to.be.fulfilled;
    });
    it('expect it to add the file using exec', () => {
      let file = 'some file';
      this.chuck.add(file);
      expect(this.execStub).to.have.been.calledWith(`chuck --add ${file}`);
    });
  });
});
