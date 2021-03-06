const taabConst = require('../../lib/const');
const rewire = require('rewire');
const taabList = rewire('../../lib/list');
const taabUtils = require('../../lib/utils');

const createApiHandlerSpy = sinon.spy();
const apiHandler = sinon.spy();
function resetSpies() {
  apiHandler.reset();
  createApiHandlerSpy.reset();
};
const mockTaabUtils = {
  createApiHandler: (method, uri, params) => {
    createApiHandlerSpy(method, uri, params);
    return apiHandler;
  },
  createMissingArgumentMessage: taabUtils.createMissingArgumentMessage,
};

taabList.__set__('taabUtils', mockTaabUtils);

describe('taab list', () => {
  context('create', () => {
    beforeEach(resetSpies);

    it('throws an error if :idBoard is not specified', () => {
      expect(() => {
        taabList.create({
          name: 'name',
          idListSource: null,
          pos: 0,
        });
      }).to.throw();
    });

    it('calls the standard api handler creator', () => {
      taabList.create({idBoard: ''});
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabList.create({idBoard: 'expected_board_id'});
      expect(createApiHandlerSpy).to.be.calledWith('post', '/lists', {
        name: taabConst.defaults.listName,
        idBoard: 'expected_board_id',
        idListSource: undefined,
        pos: 0,
      });
    });
  });

  context('deleteById', () => {
    const expectedListId = 'EXPECTED_LIST_ID';
    beforeEach(resetSpies);

    it('throws an error if :listId is not specified', () => {
      expect(() => { taabList.deleteById(); }).to.throw();
      expect(() => { taabList.deleteById({}); }).to.throw();
    });

    it('calls the standard api handler creator', () => {
      taabList.deleteById({listId: expectedListId});
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabList.deleteById({listId: expectedListId});
      expect(createApiHandlerSpy).to.be.calledWith(
        'put',
        `/lists/${expectedListId}`, {
          closed: true,
        }
      );
    });
  });

  context('get', () => {
    beforeEach(resetSpies);

    it('throws an error if :listId is not specified', () => {
      expect(() => { taabList.get(); }).to.throw();
      expect(() => { taabList.get({}); }).to.throw();
    });

    it('calls the standard api handler creator', () => {
      taabList.get({listId: 'expected_list_id'});
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabList.get({listId: 'expected_list_id'});
      expect(createApiHandlerSpy).to.be.calledWith('get', '/lists/expected_list_id', {
        fields: undefined,
      });
    });
  });

  context('queryBoard', () => {
    beforeEach(resetSpies);

    it('throws an error if :boardId is not specified', () => {
      expect(() => {
        taabList.query();
      }).to.throw();
    });

    it('calls the standard api handler creator', () => {
      taabList.queryBoard({boardId: 'expected_board_id'});
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabList.queryBoard({boardId: 'expected_board_id'});
      expect(createApiHandlerSpy).to.be.calledWith('get', '/boards/expected_board_id/lists');
    });
  });
});
