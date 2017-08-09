const taabConst = require('./const');
let taabUtils = require('./utils');

/**
 * @param {any} {
 *   name = taabConst.defaults.cardName,
 *   desc = taabConst.defaults.cardDescription,
 *   pos = 'top',
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
  pos = taabConst.defaults.cardPos,
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
 * @see https://developers.trello.com/advanced-reference/member#get-1-members-idmember-or-username-cards
 */
function queryAll({
  actions = taabConst.defaults.cardActions,
  attachments = taabConst.defaults.cardAttachments,
  attachment_fields = taabConst.defaults.cardAttachmentFields, // eslint-disable-line camelcase
  stickers = taabConst.defaults.cardStickers,
  members = taabConst.defaults.cardMembers,
  member_fields = taabConst.defaults.cardMemberFields, // eslint-disable-line camelcase
  checkItemStates = taabConst.defaults.cardCheckItemStates,
  checklists = taabConst.defaults.cardChecklists,
  limit = taabConst.defaults.cardLimit,
  since = taabConst.defaults.cardSince,
  before = taabConst.defaults.cardBefore,
  filter = taabConst.defaults.cardFilter,
  fields = taabConst.defaults.cardFields,
}) {
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
  id,
  fields,
}) {
  if(typeof id === 'undefined') {
    throw taabUtils.createMissingArgumentMessage(
      ['Board ID field :id']
    );
  }
  return taabUtils.createApiHandler.bind(this)(
    'get',
    `/boards/${id}/cards`,
    fields ? {fields} : {}
  )();
}

/**
 * @see https://developers.trello.com/v1.0/reference#listsidcards
 */
function queryList({
  id,
  fields,
}) {
  if(typeof id === 'undefined') {
    throw taabUtils.createMissingArgumentMessage(
      ['List ID :id']
    );
  }
  return taabUtils.createApiHandler.bind(this)(
    'get',
    `/lists/${id}/cards`,
    fields ? {fields} : {}
  )();
};

module.exports = {
  create,
  queryAll,
  queryBoard,
  queryList,
};
