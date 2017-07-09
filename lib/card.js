const taabConst = require('./const');
let taabUtils = require('./utils');

module.exports = {
  create: function({
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
    return taabUtils.createApiHandler.bind(this)(
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
    )();
  },
  query: function() {
    return taabUtils.createApiHandler.bind(this)(
      'get',
      '/members/me/cards'
    )();
  },
};
