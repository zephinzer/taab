# Trello-As-A-Backend
TAAB is a tool to use Trello like a NoSQL back-end by using Boards as the databases, Lists as tables and Cards as rows. I imagine this is useful for creating customised Trello workflows which will be contextualised when accessing through your own interface, yet viewable by all through Trello itself. Feel free to fork & contribute. My progress can be tracked at this Trello board: [https://trello.com/b/KqOzXTWL/taab-roadmap](https://trello.com/b/KqOzXTWL/taab-roadmap). Feel free to request for access!

[![Build Status](https://travis-ci.org/zephinzer/taab.svg?branch=master)](https://travis-ci.org/zephinzer/taab)
[![Dependency Status](https://david-dm.org/zephinzer/taab.svg)](https://david-dm.org/zephinzer/taab.svg)

Please note that **this project is not ready for use till 1.0.0**. The roadmap is not clearly defined yet either, but the end-goal of this project should look like the following code snippet:

```javascript
const TAAB = require('taab');
const taab = TAAB.init(TRELLO_API_DEVELOPER_KEY, TRELLO_TOKEN);
const myProject = taab.db('my_project');

// create `sub_project` list
myProject.create('sub_project', { ... });

// gets reference for `sub_project` list
myProject.ref('sub_project');

// gets details for `sub_project` list
myProject.ref('sub_project').info();

// get all cards from `sub_project` list
myProject.getAll('sub_project');
// get all cards from `sub_project` list satisfying
myProject.getAllWhere('sub_project', { ...CONDITIONS });
// get card from `sub_project` list with ID `:id`
myProject.get('sub_project', { id: ... });

// update card from `sub_project` list with ID `:id`
myProject.update('sub_project', { id: ... }, { ... });

// delete card from `sub_project` list with ID `:id`
myProject.del('sub_project', { id: ... });

// move card from `sub_project` list with ID `:id` to `done_sub_project` list
myProject.move(
  myProject.get(`sub_project`, { id: ... }),
  myProject.ref('done_sub_project')
);
```

## Get Trello Developer Keys
1. Get your Trello Developer API Key from https://trello.com/app-key
2. Obtain a personal development Token from https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=`<Trello Developer API Key>`
3. You should now have a Developer API Key and a personal Token

## Get Started
Install TAAB by `npm` or `yarn`:

```bash
#> npm install taab
## /or/
#> yarn add taab
```

Initialize the module:

```javascript
const taab = require('taab');
const taabInstance = taab.init(TRELLO_DEVELOPER_API_KEY, TRELLO_PERSONAL_TOKEN);
```

Get started by using `taabInstance`!

## API Documentation


### Static Methods



#### `.init()`

##### Arguments
- `:apiKey`
- `:token`

###### apiKey
The Developer API Key obtained from https://trello.com/app-key

###### token
Your personal development token obtained from https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=`<Trello Developer API Key>`



### Instance Methods



### Boards

- - -

#### `.createBoard()`
Creates a Board

##### Arguments
- `:options` : hash optionally containing the following keys:
  - `name` *= `taabConst.defaults.boardName`*
  - `defaultLabels` *= `false`*
  - `defaultLists` *= `false`*
  - `desc` *= `taabConst.defaults.boardDescription`*
  - `idOrganization`
  - `idBoardSource`
  - `keepFromSource` *= `'all'`*
  - `powerUps`
  - `prefs_permissionLevel`
  - `prefs_voting`
  - `prefs_comments`
  - `prefs_invitations`
  - `prefs_selfJoin`
  - `prefs_cardCovers`
  - `prefs_background` *= `taabConst.defaults.backgroundColor`*
  - `prefs_cardAging`

##### Example
```javascript
taabInstance.createBoard({})
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/advanced-reference/board#post-1-boards

- - -

#### `.getBoard()`
Retrieves the board identified by `:boardId`.

##### Arguments
- `:options` : hash containing the following keys:
  - `boardId` : ID of board ***required***
  - `actions`
  - `boardStars`
  - `cards`
  - `card_pluginData`
  - `checklists`
  - `fields`
  - `labels`
  - `lists`
  - `members`
  - `memberships`
  - `membersInvited`
  - `membersInvited_fields`
  - `pluginData`
  - `organization`
  - `organization_pluginData`
  - `myPrefs`

##### Examples
```javascript
taabInstance.getBoard({boardId: 'BOARD_ID'})
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/v1.0/reference#boardsboardid-1

- - -

#### `.getBoards()`
Retrieves all boards belonging to yourself.
##### Arguments
None.

##### Example
```javascript
taabInstance.getBoards()
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/v1.0/reference#membersidboards

- - -

#### `.deleteBoard()`
Closes the board specified by ID :boardId

##### Arguments
- `:options` : hash containing keys as follows:
  - `:boardId` : ID of board to close

##### Example
```javascript
taabInstance.deleteBoard({boardId: 'BOARD_ID'})
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/v1.0/reference#idnext

- - -

- - -

### Cards

- - -

#### `.createCard()`
Creates a Card

##### Arguments
- `:options` : hash containing the following keys:
  - `name` *= `taabConst.defaults.cardName`*
  - `desc` *= `taabConst.defaults.cardDescription`*
  - `pos` *= `'top'`*
  - `due`
  - `dueComplete`
  - `idList`
  - `idMembers`
  - `idLabels`
  - `urlSource`
  - `fileSource`
  - `idCardSource`
  - `keepFromSource`

##### Example
```javascript
taabInstance.createList({})
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/advanced-reference/card#post-1-cards

- - -

#### `.getCard()`
Retrieves a card given a `:cardId`.

##### Arguments
- `:options` : hash
  - `cardId` : ***required***
  - `fields`
  - `actions`
  - `attachments`
  - `attachment_fields`
  - `members`
  - `member_fields`
  - `membersVoted`
  - `memberVoted_fields`
  - `checkItemStates`
  - `checklists`
  - `checklist_fields`
  - `board`
  - `board_fields`
  - `list`
  - `pluginData`
  - `stickers`
  - `sticker_fields`

##### Example
```javascript
taabInstance.getCard({
  cardId: '1234abcdeTEST',
}).then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/v1.0/reference#cardsid

- - -

#### `.getAllCards()`
Retrievs all cards belonging to yourself.

##### Arguments
- `:options` : hash optionally containing the following keys:
  - `actions`
  - `attachments`
  - `attachment_fields`
  - `stickers`
  - `members`
  - `member_fields`
  - `checkItemStates`
  - `checklists`
  - `limit`
  - `since`
  - `before`
  - `filter`
  - `fields`

##### Example
```javascript
taabInstance.getAllCards()
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/advanced-reference/member#get-1-members-idmember-or-username-cards

- - -

#### `.getBoardCards()`
Retrieves all cards belonging to a board.

##### Arguments
- `:options` : hash containing the following properties:
  - `boardId` : ***required***
  - `fields`

##### Example
```javascript
taabInstance.getBoardCards({
  boardId: '93CstY3zuTest'
}).then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/v1.0/reference#listsidboard

- - -

#### `.getListCards()`
Retrieves all cards belonging to a list.

##### Arguments
- `:options` : hash containing the following properties:
  - `listId` ***required***
  - `fields`

##### Example
```javascript
taabInstance.getListCards({
  listId: '93CstY3zuTest'
}).then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/v1.0/reference#listsidcards

- - - 

### Lists

- - -

#### `.createList()`
Creates a List

##### Arguments
- `:options` : hash optionally containing the following keys:
  - `name` *= `taabConst.defaults.listName`*
  - `idBoard`
  - `idListSource`
  - `pos`

##### Example
```javascript
taabInstance.createList({})
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/advanced-reference/list#post-1-lists

- - -

#### `.getBoardLists()`
Retrieves all lists from a board

##### Arguments
- `:options` : hash
  - `idBoard` *required*

##### Example
```javascript
taabInstance.getBoardLists({
  boardId: '93DquTrsTEST'
}).then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/v1.0/reference#boardsboardidlists

- - -

#### `.getList()`

##### Arguments
- `:options` : hash
  - `listId` ***required***
  - `fields`

##### Example
```javascript
taabInstance.getList({
  listId: '8faASd938DS13w'
}).then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/v1.0/reference#listsid

- - -

### Utility

- - -

#### `.getMember()`
Retrieves a member given a Trello user ID

##### Arguments
- `:memberId` : Trello ID of the member

##### Example
```javascript
taabInstance.getMember({
  memberId: '3892e8asd7ea8bc231'
}).then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/v1.0/reference#membersid

- - -

#### `.getProfile()`
Retrieves your own profile.

##### Arguments
None

##### Example
```javascript
taabInstance.getProfile()
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More


- - -

#### `.getOrganizations()`
Retrieves your organisations.

##### Arguments
None

##### Example
```javascript
taabInstance.getOrganizations()
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

##### See More
https://developers.trello.com/v1.0/reference#membersidorganizations

- - -

#### `.verify()`
Verifies that the correct key/token was provided to the instance.

##### Arguments
None

##### Example
```javascript
taabInstance.verify()
  .then(() => { console.info('success'); })
  .catch((error) => { console.error('error'); });
```

- - -

## SDLC
### Process
1. Fork this repository
2. See Trello board @ https://trello.com/b/KqOzXTWL/taab-roadmap
3. Pick an item from the Feature List and move it to Work In Progress
4. Make your changes/additions
5. If reasonable to do so, squash your commits with `git rebase HEAD~<N>` where `N` is the number of commits in your change/addition (makes it easier to see what was changed).
6. Run `npm run eslint`
7. Run `npm test`
8. Merge into your `master` branch and create a Merge Request
9. On passing of the pipeline on Travis, I'll merge it in

### Examples
To run the examples, execute the following command:

```bash
#> npm start
```

### General Task Checklist
☐ Add changes to `./lib/*.js`  
☐ Add relevant tests into `./test`  
☐ Add example usage in `./examples`  
☐ Change README.md to reflect modifications  
☐ Bump minor version number for non-breaking changes  
☐ Bump major version number ofr breaking changes  

### Versioning
We follow [`semver`](http://semver.org/) which means:

1. MAJOR version when you make incompatible API changes,
2. MINOR version when you add functionality in a backwards-compatible manner, and
3. PATCH version when you make backwards-compatible bug fixes.

Apply the appropriate changes to `package.json` when you contribute

### Notes
- Remember to update the readme if adding new APIs
- Add it to the changelog below as well for the *next* version. Ie if the current version is 1.0.0 when you make the change, list it under 1.0.

## Changelog
### 22nd August 2017
Published 0.7.1  
➕ instance.deleteBoard()  
➕ instance.getBoard()  

### 11th August 2017
Published 0.6.0  
➕ instance.getCard()  

### 9th August 2017
Published 0.5.2

> Added examples (use `npm start` to run the basic example)  
➕ ~instance.getCards()~ instance.getAllCards()  
➕ instance.getBoardCards()  
➕ instance.getListCards()  
➕ instance.getBoardLists()  
➕ instance.createBoard()  

### 3rd July 2017
Published 0.3.0.  
➕ instance.verify()  
➕ instance.createCard()  
➕ instance.createList()  

Published 0.2.0.  
➕ static.init()  
➕ instance.getMember()  
➕ instance.getProfile()  
➕ instance.getBoards()  
➕ instance.getOrganisations()  
➕ instance.getOrganizations()  
➕ instance.getCards()
