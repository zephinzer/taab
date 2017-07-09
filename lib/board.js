const taabConst = require('./const');
let taabUtils = require('./utils');

module.exports = {
  create: function({
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
  },
  query: function() {
    return taabUtils.createApiHandler.bind(this)(
      'get',
      '/members/me/boards'
    )();
  },
};
