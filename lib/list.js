const taabConst = require('./const');
let taabUtils = require('./utils');

module.exports = {
  /**
   * @see https://developers.trello.com/v1.0/reference#lists-1
   */
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
  /**
   * @see https://developers.trello.com/v1.0/reference#boardsboardidlists
   */
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
