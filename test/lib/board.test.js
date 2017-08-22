const taabConst = require('../../lib/const');
const rewire = require('rewire');
const taabBoard = rewire('../../lib/board');
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
      expect(createApiHandlerSpy).to.be.calledWith('post', '/boards', {
        name: taabConst.defaults.boardName,
        defaultLabels: taabConst.defaults.boardDefaultLabels,
        defaultLists: taabConst.defaults.boardDefaultLists,
        desc: taabConst.defaults.boardDescription,
        idOrganization: undefined,
        idBoardSource: undefined,
        keepFromSource: taabConst.defaults.boardKeepFromSource,
        powerUps: undefined,
        prefs_permissionLevel: undefined, // eslint-disable-line camelcase
        prefs_voting: undefined, // eslint-disable-line camelcase
        prefs_comments: undefined, // eslint-disable-line camelcase
        prefs_invitations: undefined, // eslint-disable-line camelcase
        prefs_selfJoin: undefined, // eslint-disable-line camelcase
        prefs_cardCovers: undefined, // eslint-disable-line camelcase
        prefs_background: taabConst.defaults.backgroundColor, // eslint-disable-line camelcase
        prefs_cardAging: undefined, // eslint-disable-line camelcase
      });
    });
  });

  context('get', () => {
    beforeEach(() => {
      apiHandler.reset();
      createApiHandlerSpy.reset();
    });

    it('throws an error if :boardId is not specified', () => {
      expect(() => {
        taabBoard.get();
      }).to.throw();
    });

    it('calls the standard api handler creator', () => {
      taabBoard.get({
        boardId: ':boardId',
      });
      expect(apiHandler).to.be.calledOnce;
    });

    it('calls the correct trello endpoint', () => {
      taabBoard.get({
        boardId: ':boardId',
      });
      expect(createApiHandlerSpy).to.be.calledWith('get', '/boards/:boardId', {
        actions: true,
        boardStars: 'mine',
        card_pluginData: true,
        cards: 'none',
        checklists: 'none',
        fields: 'all',
        labels: null,
        lists: true,
        members: true,
        membersInvited: true,
        membersInvited_fields: 'all',
        memberships: true,
        myPrefs: false,
        organization: true,
        organization_pluginData: true,
        pluginData: true,
        tags: '',
      });
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
