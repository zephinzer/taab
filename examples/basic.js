const inquirer = require('inquirer');
const q = require('q');
const taab = require('../index');

const questions = {
  credentials: [
    {
      type: 'input',
      name: 'apiKey',
      message: 'Paste your Trello Developer API Key here',
    },
    {
      type: 'input',
      name: 'token',
      message: 'Paste your Trello Personal Token here',
    },
  ],
  possibleActions: [
    {
      choices: [
        'create-board',
        'get-boards',
        'create-list',
        'get-lists',
        'create-card',
        'get-all-cards',
        'get-cards-by-list',
        'get-profile',
        'exit',
      ],
      message: 'What are we trying out today?',
      name: 'action',
      type: 'list',
    },
  ],
  createList: [
    {
      type: 'input',
      name: 'boardId',
      message: 'Paste the board ID here',
    },
    {
      type: 'input',
      name: 'boardName',
      message: 'What name shall we give it?',
    },
  ],
  getLists: [
    {
      type: 'input',
      name: 'boardId',
      message: 'Paste the board ID here',
    },
  ],
  createCard: [
    {
      type: 'input',
      name: 'listId',
      message: 'Paste the list ID here',
    },
    {
      type: 'input',
      name: 'listName',
      message: 'What name shall we give it?',
    },
  ],
  getCards: [
    {
      possibleActions: [
        'all of my cards',
        'cards belonging to a list',
      ],
      message: 'Choose the most applicable:',
      name: 'action',
      type: 'list',
    },
  ],
};

let taabInstance = null;

(function main() {
  getCredentials()
    .then(loopActionSelection);
})();

/** ---------------------
    _  _   _ _____ _  _ 
   /_\| | | |_   _| || |
  / _ \ |_| | | | | __ |
 /_/ \_\___/  |_| |_||_|
                        
--------------------- **/

function getCredentials() {
  const deferred = q.defer();
  if(!process.env.TRELLO_API_KEY || !process.env.TRELLO_TOKEN) {
    getCredentialsLoopTillSuccess(deferred.resolve);
  } else {
    const apiKey = process.env.TRELLO_API_KEY;
    const token = process.env.TRELLO_TOKEN;
    taabInstance = taab.init(apiKey, token);
    console.info(' - - verifying key and token - - ');
    taabInstance.verify()
      .then(() => {
        console.info(' ✅ credentials valid');
        deferred.resolve();
      })
      .catch((error) => {
        console.error(error);
        console.error(' ❌ credentials invalid - try again...');
        process.env.TRELLO_API_KEY = null;
        process.env.TRELLO_TOKEN = null;
        getCredentials(onSuccess);
      });
  }
  return deferred.promise;
};

function loopActionSelection() {
  inquirer.prompt(questions.possibleActions).then((answers) => {
    const {action} = answers;
    switch (action) {
      case 'create-board': createBoard(loopActionSelection); break;
      case 'get-boards': getBoards(loopActionSelection); break;
      case 'create-list': createList(loopActionSelection); break;
      case 'get-lists': getLists(loopActionSelection); break;
      case 'create-card': createCard(loopActionSelection); break;
      case 'get-all-cards': getAllCards(loopActionSelection); break;
      case 'get-cards-by-list': getCardsByList(loopActionSelection); break;
      case 'get-profile': getProfile(loopActionSelection); break;
      case 'exit': process.exit(0); break;
      default:
        console.info('An invalid action was selected.');
        loopActionSelection();
    }
  });
};

function getCredentialsLoopTillSuccess(onSuccess) {
  inquirer.prompt(questions.credentials)
    .then((answers) => {
      const {apiKey, token} = answers;
      taabInstance = taab.init(apiKey, token);
      console.info(' - - verifying key and token - - ');
      taabInstance.verify()
        .then(() => {
          console.info(' ✅ credentials valid');
          onSuccess();
        })
        .catch((error) => {
          console.error(error);
          console.error(' ❌ credentials invalid - try again...');
          getCredentials(onSuccess);
        });
    })
    .catch(console.error);
};

/** ----------------------------
   ___  ___   _   ___ ___  ___ 
  | _ )/ _ \ /_\ | _ \   \/ __|
  | _ \ (_) / _ \|   / |) \__ \
  |___/\___/_/ \_\_|_\___/|___/

---------------------------- **/                              

function createBoard(callback) {
  taabInstance.createBoard({})
    .then((res) => {
      console.log(res);
      console.info(` ✅ board ['${res.name}'] was created with description "${res.desc}" ( 👉🏽 ${res.url} || ${res.shortUrl})`);
      callback();
    })
    .catch((error) => {
      console.error(error);
      callback();
    });
};

function getBoards(callback) {
  taabInstance.getBoards()
    .then((res) => {
      const boards = res.map((item) => {
        return `\n|${item.id}|[ ${item.name} ]( ${item.url} )`;
      });
      console.log(res);
      console.info(` ✅ [${res.length}] boards retrieved:\n\n${boards}`);
      callback();
    })
    .catch((error) => {
      console.error(error);
      callback();
    });
};

/** ----------------------
  _    ___ ___ _____ ___ 
 | |  |_ _/ __|_   _/ __|
 | |__ | |\__ \ | | \__ \
 |____|___|___/ |_| |___/
                         
---------------------- **/

function createList(callback) {
  inquirer.prompt(questions.createList).then((answers) => {
    taabInstance
      .createList({
        idBoard: answers.boardId,
        name: answers.boardName,
      })
      .then((res) => {
        console.log(res);
        console.info(` ✅ list [ID: ${res.id}]`);
        callback();
      })
      .catch((error) => {
        console.error(error);
        callback();
      });
  });
};

function getLists(callback) {
  inquirer.prompt(questions.getLists).then((answers) => {
    taabInstance
      .getLists({
        idBoard: answers.boardId,
      })
      .then((res) => {
        console.log(res);
        callback();
      })
      .catch((error) => {
        console.error(error);
        callback();
      });
  });
};

/** -----------------------
   ___   _   ___ ___  ___ 
  / __| /_\ | _ \   \/ __|
 | (__ / _ \|   / |) \__ \
  \___/_/ \_\_|_\___/|___/
                          
----------------------- **/

function createCard(callback) {
  inquirer.prompt(questions.createCard).then((answers) => {
    taabInstance
      .createCard({
        idList: answers.listId,
        name: answers.listName,
      })
      .then((res) => {
        console.log(res);
        console.info(` ✅ list [ID: ${res.id}]`);
        callback();
      })
      .catch((error) => {
        console.error(error);
        callback();
      });
  });
};

function getAllCards(callback) {
  taabInstance
    .getAllCards()
    .then((res) => {
      console.log(res);
      callback();
    })
    .catch((error) => {
      console.error(error);
      callback();
    });
};

function getCardsByList(callback) { // todo : write questions for getListCards
  inquirer.prompt(questions.getListCards).then((answers) => {
    taabInstance // 595912dee6c8dde18caa02d8
      .getListCards({
        idList: answers.listId,
      })
      .then((res) => {
        console.log(res);
        callback();
      })
      .catch((error) => {
        console.error(error);
        callback();
      });
  });
};

function getProfile(callback) {
  taabInstance.getProfile()
    .then((res) => {
      console.info(res);
      callback();
    })
    .catch((error) => {
      console.error(error);
      callback();
    });
};
