const taabBoard = require('./lib/board');
const taabConst = require('./lib/const');
const taabUtils = require('./lib/utils');


const TAAB = function(key, token) {
  this.config = {key, token};
  this.createApiHandler = taabUtils.createApiHandler.bind(this);
  return this;
};
TAAB.constant = taabConst;
TAAB.init = function(developerApiKey, personalToken) {
  return new TAAB(developerApiKey, personalToken);
};

/**
 * @see https://developers.trello.com/advanced-reference/board#post-1-boards
 */
TAAB.prototype.createBoard = taabBoard.create;

/**
 * @see https://developers.trello.com/advanced-reference/list#post-1-lists
 */
TAAB.prototype.createList = function({
  name = taabConst.defaults.listName,
  idBoard,
  idListSource,
  pos,
}) {
  return taabUtils.createApiHandler.bind(this)()(
    'post',
    '/lists',
    {
      name,
      idBoard,
      idListSource,
      pos,
    }
  );
};

/**
 * @see https://developers.trello.com/advanced-reference/card#post-1-cards
 */
TAAB.prototype.createCard = function({
  name = taabConst.defaults.cardName,
  desc = taabConst.defaults.cardDescription,
  pos = 'top',
  due,
  dueComplete,
  idList,
  idMembers,
  idLabels,
  urlSource,
  fileSource,
  idCardSource,
  keepFromSource,
}) {
  return taabUtils.createApiHandler.bind(this)()(
    'post',
    '/cards',
    {
      name,
      desc,
      pos,
      due,
      dueComplete,
      idList,
      idMembers,
      idLabels,
      urlSource,
      fileSource,
      idCardSource,
      keepFromSource,
    }
  );
};


// READ
TAAB.prototype.verify = function() {
  return this.createApiHandler('get', '/authorize')();
};
TAAB.prototype.getMember = function(memberId) {
  return this.createApiHandler('get', `/members/${memberId}`)();
};
TAAB.prototype.getProfile = function() {
  return this.createApiHandler('get', '/members/me')();
};
TAAB.prototype.getBoards = taabBoard.query;
TAAB.prototype.getOrganisations = TAAB.prototype.getOrganizations = function() {
  return this.createApiHandler('get', '/members/me/organizations')();
};
TAAB.prototype.getCards = function() {
  return this.createApiHandler('get', '/members/me/cards')();
};

module.exports = TAAB;
