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

TAAB.prototype.createBoard = taabBoard.create;
TAAB.prototype.createCard = taabCard.create;
TAAB.prototype.createList = taabList.create;
TAAB.prototype.deleteBoard = taabBoard.deleteById;
TAAB.prototype.getAllCards = taabCard.queryAll;
TAAB.prototype.getBoard = taabBoard.get;
TAAB.prototype.getBoards = taabBoard.query;
TAAB.prototype.getBoardCards = taabCard.queryBoard;
TAAB.prototype.getBoardLists = taabList.queryBoard;
TAAB.prototype.getCard = taabCard.get;
TAAB.prototype.getListCards = taabCard.queryList;

/**
 * @see https://developers.trello.com/v1.0/reference#membersid
 */
TAAB.prototype.getMember = function({memberId}) {
  return this.createApiHandler('get', `/members/${memberId}`)();
};

/**
 * @see https://developers.trello.com/v1.0/reference#membersid
 */
TAAB.prototype.getProfile = function() {
  return this.createApiHandler('get', '/members/me')();
};

/**
 * @see https://developers.trello.com/v1.0/reference#membersidorganizations
 */
TAAB.prototype.getOrganisations = // alias, brits & mericans can co-exist
  TAAB.prototype.getOrganizations = function() {
  return this.createApiHandler('get', '/members/me/organizations')();
};

TAAB.prototype.verify = function() {
  return this.createApiHandler('get', '/authorize')();
};

module.exports = TAAB;
