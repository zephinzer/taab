const taabConst = require('./const');
let taabUtils = require('./utils');

/**
 * @see https://developers.trello.com/v1.0/reference#boardsid
 */
function create({
  name = taabConst.defaults.boardName,
  defaultLabels = taabConst.defaults.boardDefaultLabels,
  defaultLists = taabConst.defaults.boardDefaultLists,
  desc = taabConst.defaults.boardDescription,
  idOrganization,
  idBoardSource,
  keepFromSource = taabConst.defaults.boardKeepFromSource,
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
  return taabUtils.createApiHandler.bind(this)(
    'post',
    '/boards',
    {
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
    }
  )();
};

/**
 * @see https://developers.trello.com/v1.0/reference#boardsboardid-1
 */
function get({
  boardId,
  actions = true,
  boardStars = 'mine',
  cards = 'none',
  card_pluginData = true, // eslint-disable-line camelcase
  checklists = 'none',
  fields = 'all',
  labels = null,
  lists = true,
  members = true,
  memberships = true,
  membersInvited = true,
  membersInvited_fields = 'all', // eslint-disable-line camelcase
  pluginData = true,
  organization = true,
  organization_pluginData = true, // eslint-disable-line camelcase
  myPrefs = false,
  tags = '',
} = {}) {
  if(typeof boardId === 'undefined') {
    console.log(taabUtils);
    throw taabUtils.createMissingArgumentMessage(
      ['Board ID :boardId']
    );
  }
  return taabUtils.createApiHandler.bind(this)(
    'get',
    `/boards/${boardId}`, {
      actions,
      boardStars,
      cards,
      card_pluginData,
      checklists,
      fields,
      labels,
      lists,
      members,
      memberships,
      membersInvited,
      membersInvited_fields,
      pluginData,
      organization,
      organization_pluginData,
      myPrefs,
      tags,
    }
  )();
};


/**
 * @see https://developers.trello.com/v1.0/reference#membersidboards
 */
function query() {
  return taabUtils.createApiHandler.bind(this)(
    'get',
    '/members/me/boards'
  )();
};

module.exports = {
  create,
  get,
  query,
};
