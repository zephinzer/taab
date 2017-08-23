const taabConst = require('./const');
let taabUtils = require('./utils');

/**
 * @see https://developers.trello.com/v1.0/reference#lists-1
 */
function create({
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
};

/**
 * @see https://developers.trello.com/v1.0/reference#listsid
 */
function get({
  listId,
  fields,
} = {}) {
  if(typeof listId === 'undefined') {
    throw taabUtils.createMissingArgumentMessage(
      ['List ID :listId']
    );
  }
  return taabUtils.createApiHandler.bind(this)(
    'get',
    `/lists/${listId}`, {
      fields,
    }
  )();
}

/**
 * @see https://developers.trello.com/v1.0/reference#boardsboardidlists
 */
function queryBoard({
  boardId,
}) {
  if(typeof boardId === 'undefined') {
    throw new Error('boardId is a required property');
  }
  return taabUtils.createApiHandler.bind(this)(
    'get',
    `/boards/${boardId}/lists`
  )();
};

module.exports = {
  create,
  get,
  queryBoard,
};
