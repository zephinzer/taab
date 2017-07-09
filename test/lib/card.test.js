const rewire = require('rewire');
const taabCard = rewire('../../lib/card');

const createApiHandlerSpy = sinon.spy();
const apiHandler = sinon.spy();

const mockTaabUtils = {
  createApiHandler: (method, uri) => {
    createApiHandlerSpy(method, uri);
    return apiHandler;
  },
};

taabCard.__set__('taabUtils', mockTaabUtils);

describe('taab card', () => {
  context('create', () => {
    beforeEach(() => {
      createApiHandlerSpy.reset();
    });

    it('throws an error if no arguments are specified', () => {
      expect(() => {
        taabCard.create();
      }).to.throw();
    });

    it('calls the standard api handler creator', () => {
      taabCard.create({});
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabCard.create({});
      expect(createApiHandlerSpy).to.be.calledWith('post', '/cards');
    });
  });

  context('query', () => {
    beforeEach(() => {
      apiHandler.reset();
      createApiHandlerSpy.reset();
    });

    it('calls the standard api handler creator', () => {
      taabCard.query();
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabCard.query();
      expect(createApiHandlerSpy).to.be.calledWith('get', '/members/me/cards');
    });
  });
});
