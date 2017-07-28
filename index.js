const taabBoard = require('./lib/board');
const taabCard = require('./lib/card');
const taabList = require('./lib/list');
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
TAAB.prototype.getBoards = taabBoard.query;

/**
 * @see https://developers.trello.com/advanced-reference/list#post-1-lists
 */
TAAB.prototype.createList = taabList.create;
TAAB.prototype.getLists = taabList.query;

/**
 * @see https://developers.trello.com/advanced-reference/card#post-1-cards
 */
TAAB.prototype.createCard = taabCard.create;
TAAB.prototype.getCards = taabCard.query;

TAAB.prototype.verify = function() {
  return this.createApiHandler('get', '/authorize')();
};
TAAB.prototype.getMember = function(memberId) {
  return this.createApiHandler('get', `/members/${memberId}`)();
};
TAAB.prototype.getProfile = function() {
  return this.createApiHandler('get', '/members/me')();
};
TAAB.prototype.getOrganisations = // alias, brits & mericans can co-exist
  TAAB.prototype.getOrganizations = function() {
  return this.createApiHandler('get', '/members/me/organizations')();
};

module.exports = TAAB;
