const taabConst = require('./const');
let taabUtils = require('./utils');
console.log(taabConst);
/**
 * @param {any} {
 *   name,
 *   desc,
 *   pos,
 *   due,
 *   dueComplete,
 *   idList,
 *   idMembers,
 *   idLabels,
 *   urlSource,
 *   fileSource,
 *   idCardSource,
 *   keepFromSource,
 * } 
 * @returns {Promise}
 * @see https://developers.trello.com/advanced-reference/card#post-1-cards
 */
function create({
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
  if(typeof idList === 'undefined') {
    throw taabUtils.createMissingArgumentMessage(
      [
        'List ID :idList',
      ]
    );
  }
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
};

/**
 * @returns {Promise}
 * @see https://developers.trello.com/v1.0/reference#cardsid
 */
function get({
  cardId,
  fields = taabConst.C.ALL,
  actions,
  attachments = true,
  attachment_fields = taabConst.C.ALL, // eslint-disable-line camelcase
  members = true,
  member_fields = taabConst.C.ALL, // eslint-disable-line camelcase
  membersVoted = true,
  memberVoted_fields = taabConst.C.ALL, // eslint-disable-line camelcase
  checkItemStates,
  checklists = taabConst.C.ALL,
  checklist_fields = taabConst.C.ALL, // eslint-disable-line camelcase
  board = true,
  board_fields = taabConst.C.ALL, // eslint-disable-line camelcase
  list = true,
  pluginData = true,
  stickers = true,
  sticker_fields = taabConst.C.ALL, // eslint-disable-line camelcase
} = {}) {
  if(typeof cardId === 'undefined') {
    throw taabUtils.createMissingArgumentMessage(
      ['Card ID :cardId']
    );
  }
  return taabUtils.createApiHandler.bind(this)(
    'get',
    `/cards/${cardId}`,
    {
      fields,
      actions,
      attachments,
      attachment_fields,
      members,
      member_fields,
      membersVoted,
      memberVoted_fields,
      checkItemStates,
      checklists,
      checklist_fields,
      board,
      board_fields,
      list,
      pluginData,
      stickers,
      sticker_fields,
    }
  )();
};

/**
 * @returns {Promise}
 * @see https://developers.trello.com/advanced-reference/member#get-1-members-idmember-or-username-cards
 */
function queryAll({
  actions = taabConst.C.ALL,
  attachments = true,
  attachment_fields = taabConst.C.ALL, // eslint-disable-line camelcase
  stickers = true,
  members = true,
  member_fields = taabConst.C.ALL, // eslint-disable-line camelcase
  checkItemStates = true,
  checklists = taabConst.C.ALL,
  limit = 100,
  since = null,
  before = null,
  filter = 'visible',
  fields = taabConst.C.ALL,
} = {}) {
  return taabUtils.createApiHandler.bind(this)(
    'get',
    '/members/me/cards',
    {
      actions,
      attachments,
      attachment_fields,
      stickers,
      members,
      member_fields,
      checkItemStates,
      checklists,
      limit,
      since,
      before,
      filter,
      fields,
    }
  )();
};

/**
 * @see https://developers.trello.com/v1.0/reference#listsidboard
 */
function queryBoard({
  boardId,
  fields,
} = {}) {
  if(typeof boardId === 'undefined') {
    throw taabUtils.createMissingArgumentMessage(
      ['Board ID field :boardId']
    );
  }
  return taabUtils.createApiHandler.bind(this)(
    'get',
    `/boards/${boardId}/cards`,
    fields ? {fields} : {}
  )();
}

/**
 * @see https://developers.trello.com/v1.0/reference#listsidcards
 */
function queryList({
  listId,
  fields,
}) {
  if(typeof listId === 'undefined') {
    throw taabUtils.createMissingArgumentMessage(
      ['List ID :listId']
    );
  }
  return taabUtils.createApiHandler.bind(this)(
    'get',
    `/lists/${listId}/cards`,
    fields ? {fields} : {}
  )();
};

module.exports = {
  create,
  get,
  queryAll,
  queryBoard,
  queryList,
};
