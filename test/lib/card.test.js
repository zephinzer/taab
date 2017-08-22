const taabConst = require('../../lib/const');
const rewire = require('rewire');
const taabCard = rewire('../../lib/card');
const taabUtils = require('../../lib/utils');

const createApiHandlerSpy = sinon.spy();
const apiHandler = sinon.spy();

const mockTaabUtils = {
  createApiHandler: (method, uri, params) => {
    createApiHandlerSpy(method, uri, params);
    return apiHandler;
  },
  createMissingArgumentMessage: taabUtils.createMissingArgumentMessage,
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

    it('throws an error if the :idList argument is not specified', () => {
      expect(() => {
        taabCard.create({});
      }).to.throw();
    });

    it('calls the standard api handler creator', () => {
      taabCard.create({idList: ''});
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabCard.create({idList: ''});
      expect(createApiHandlerSpy).to.be.calledWith('post', '/cards');
    });
  });

  context('get', () => {
    beforeEach(() => {
      apiHandler.reset();
      createApiHandlerSpy.reset();
    });

    it('throws an error if no arguments are specified', () => {
      expect(() => {
        taabCard.get();
      }).to.throw();
    });

    it('throws an error if :cardId is not specified', () => {
      expect(() => {
        taabCard.get({});
      }).to.throw();
    });
  });

  context('queryAll', () => {
    beforeEach(() => {
      apiHandler.reset();
      createApiHandlerSpy.reset();
    });

    it('does not throw an error if no arguments are specified', () => {
      expect(() => {
        taabCard.queryAll();
      }).to.not.throw();
    });

    it('calls the standard api handler creator', () => {
      taabCard.queryAll({});
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabCard.queryAll({});
      expect(createApiHandlerSpy).to.be.calledWith('get', '/members/me/cards', {
        actions: taabConst.C.ALL,
        attachments: true,
        attachment_fields: taabConst.C.ALL, // eslint-disable-line camelcase
        stickers: true,
        members: true,
        member_fields: taabConst.C.ALL, // eslint-disable-line camelcase
        checkItemStates: true,
        checklists: taabConst.C.ALL,
        limit: 100,
        since: null,
        before: null,
        filter: 'visible',
        fields: taabConst.C.ALL,
      });
    });
  });

  context('queryBoard', () => {
    beforeEach(() => {
      apiHandler.reset();
      createApiHandlerSpy.reset();
    });

    it('throws an error if no arguments are specified', () => {
      expect(() => {
        taabCard.queryBoard();
      }).to.throw();
    });

    it('calls the standard api handler creator', () => {
      taabCard.queryBoard({boardId: 'id'});
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabCard.queryBoard({boardId: 'id'});
      expect(createApiHandlerSpy).to.be.calledWith('get', '/boards/id/cards', {
      });
    });
  });

  context('queryList', () => {
    beforeEach(() => {
      apiHandler.reset();
      createApiHandlerSpy.reset();
    });

    it('throws an error if no arguments are specified', () => {
      expect(() => {
        taabCard.queryList();
      }).to.throw();
    });

    it('calls the standard api handler creator', () => {
      taabCard.queryList({listId: 'id'});
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabCard.queryList({listId: 'id'});
      expect(createApiHandlerSpy).to.be.calledWith('get', '/lists/id/cards', {
      });
    });
  });
});
