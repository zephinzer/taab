const C = {
  ALL: 'all',
  PKGURL: 'https://www.npmjs.com/package/taab',
};

const defaults = {
  boardDefaultLabels: false,
  boardDefaultLists: false,
  boardDescription: `this board was created by TAAB (see ${C.PKGURL})`,
  boardKeepFromSource: C.ALL,
  boardName: '[taab] new board',
  backgroundColor: 'grey',
  cardDescription: `this card was created by TAAB (see ${C.PKGURL})`,
  cardName: '[taab] new card',
  listName: '[taab] new list',
};

const urlStub = 'https://api.trello.com/1';

module.exports = {
  C,
  urlStub,
  defaults,
};
