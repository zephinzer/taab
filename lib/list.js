const taabConst = require('./const');
let taabUtils = require('./utils');

module.exports = {
  create: function({
    name = taabConst.defaults.listName,
    idBoard,
    idListSource,
    pos = 0,
  }) {
    if(typeof idBoard === 'undefined') {
      throw new Error('idBoard is a required property');
    }
    return taabUtils.createApiHandler.bind(this)(
      'post',
      '/lists',
      {
        name,
        idBoard,
        idListSource,
        pos,
      }
    )();
  },
  query: function({
    idBoard,
  }) {
    if(typeof idBoard === 'undefined') {
      throw new Error('idBoard is a required property');
    }
    return taabUtils.createApiHandler.bind(this)(
      'get',
      `/boards/${idBoard}/lists`
    )();
  },
};
