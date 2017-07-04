const rewire = require('rewire');
const taabBoard = rewire('../../lib/board');

const createApiHandlerSpy = sinon.spy();
const apiHandler = sinon.spy();

const mockTaabUtils = {
  createApiHandler: (method, uri) => {
    createApiHandlerSpy(method, uri);
    return apiHandler;
  },
};

taabBoard.__set__('taabUtils', mockTaabUtils);

describe('taab board', () => {
  context('create', () => {
    beforeEach(() => {
      createApiHandlerSpy.reset();
    });

    it('throws an error if no arguments are specified', () => {
      expect(() => {
        taabBoard.create();
      }).to.throw();
    });

    it('calls the standard api handler creator', () => {
      taabBoard.create({});
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabBoard.create({});
      expect(createApiHandlerSpy).to.be.calledWith('post', '/boards');
    });
  });

  context('query', () => {
    beforeEach(() => {
      apiHandler.reset();
      createApiHandlerSpy.reset();
    });

    it('calls the standard api handler creator', () => {
      taabBoard.query({});
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabBoard.query({});
      expect(createApiHandlerSpy).to.be.calledWith('get', '/members/me/boards');
    });
  });
});
