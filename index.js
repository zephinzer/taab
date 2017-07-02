const taabUtils = require('./lib/utils');
const taabConst = require('./lib/const');

const TAAB = function(key, token) {
  this.config = {key, token};
  return this;
};
TAAB.constant = taabConst;
TAAB.init = function(developerApiKey, personalToken) {
  return new TAAB(developerApiKey, personalToken);
};

// CREATE

/**
 * @see https://developers.trello.com/advanced-reference/board#post-1-boards
 */
TAAB.prototype.createBoard = function({
  name = taabConst.defaults.boardName,
  defaultLabels = false,
  defaultLists = false,
  desc = taabConst.defaults.boardDescription,
  idOrganization,
  idBoardSource,
  keepFromSource = 'all',
  powerUps,
  prefs_permissionLevel, // eslint-disable-line camelcase
  prefs_voting, // eslint-disable-line camelcase
  prefs_comments, // eslint-disable-line camelcase
  prefs_invitations, // eslint-disable-line camelcase
  prefs_selfJoin, // eslint-disable-line camelcase
  prefs_cardCovers, // eslint-disable-line camelcase
  prefs_background = taabConst.defaults.backgroundColor, // eslint-disable-line camelcase
  prefs_cardAging, // eslint-disable-line camelcase
}) {
  return taabUtils.createApiHandler('post', `/boards`, {
    name,
    defaultLabels,
    defaultLists,
    desc,
    idOrganization,
    idBoardSource,
    keepFromSource,
    powerUps,
    prefs_permissionLevel,
    prefs_voting,
    prefs_comments,
    prefs_invitations,
    prefs_selfJoin,
    prefs_cardCovers,
    prefs_background,
    prefs_cardAging,
  }).bind(this)();
};

/**
 * @see https://developers.trello.com/advanced-reference/list#post-1-lists
 */
TAAB.prototype.createList = function({
  name = taabConst.defaults.listName,
  idBoard,
  idListSource,
  pos,
}) {
  return taabUtils.createApiHandler('post', `/lists`, {
    name,
    idBoard,
    idListSource,
    pos,
  }).bind(this)();
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
  return taabUtils.createApiHandler('post', `/lists`, {
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
  }).bind(this)();
};


// READ
TAAB.prototype.getMember = function(memberId) {
  return taabUtils.createApiHandler('get', `/members/${memberId}`).bind(this)();
};
TAAB.prototype.getProfile = taabUtils.createApiHandler('get', '/members/me');
TAAB.prototype.getBoards = taabUtils.createApiHandler('get', '/members/me/boards');
TAAB.prototype.getOrganisations = taabUtils.createApiHandler('get', '/members/me/organizations');
TAAB.prototype.getOrganizations = TAAB.prototype.getOrganisations;
TAAB.prototype.getCards = taabUtils.createApiHandler('get', '/members/me/cards');

module.exports = TAAB;
