const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const {expect} = chai;
const sinon = require('sinon');

global.expect = expect;
global.sinon = sinon;
