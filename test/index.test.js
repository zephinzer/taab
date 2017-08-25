const TAAB = require('../');

describe('taab', () => {
  context('static props', () => {
    it('has the correct static properties/methods', () => {
      const taabStaticProperties = Object.keys(TAAB);
      expect(taabStaticProperties).to.deep.equal([
        'constant',
        'init',
      ]);
    });
  });

  context('instance props', () => {
    const taabInstance = new TAAB();

    it('has the correct instance properties/methods', () => {
      const taabInstanceProperties = Object.getPrototypeOf(taabInstance);
      expect(taabInstanceProperties).to.have.keys([
        'createBoard',
        'createList',
        'createCard',
        'deleteBoard',
        'deleteList',
        'getAllCards',
        'getBoard',
        'getBoardCards',
        'getBoardLists',
        'getBoards',
        'getCard',
        'getList',
        'getListCards',
        'getMember',
        'getOrganisations',
        'getOrganizations',
        'getProfile',
        'verify',
      ]);
    });
  });
});
