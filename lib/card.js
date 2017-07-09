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
  if(idList === undefined) {
    throw new Error('idList is a required property');
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
function query({
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
}

module.exports = {
  create,
  query,
};
