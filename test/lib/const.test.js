const taabConst = require('../../lib/const');

describe('taab const', () => {
  it('has the correct properties', () => {
    expect(taabConst).to.contain.keys([
      'urlStub',
      'defaults',
    ]);
  });

  context('defaults', () => {
    it('has the correct properties', () => {
      expect(taabConst.defaults).to.contain.keys([
        'boardDescription',
        'boardName',
        'backgroundColor',
        'cardDescription',
        'cardName',
        'listName',
      ]);
    });
  });
});
