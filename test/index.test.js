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
      expect(taabInstanceProperties).to.contain.keys([
        'createBoard',
        'createList',
        'createCard',
        'getBoards',
        'getAllCards',
        'getBoardCards',
        'getBoardLists',
        'getCard',
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
