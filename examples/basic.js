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
        'get-board',
        'delete-board (close)',
        'create-list',
        'get-lists',
        'get-list',
        'create-card',
        'get-card',
        'get-all-cards',
        'get-cards-by-list',
        'get-cards-by-board',
        'get-profile',
        'exit',
      ],
      message: 'What are we trying out today?',
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

function handleError(error, message) {
  console.error('⚠️️️⚠️️️⚠️️️ START');
  console.error(error);
  console.error('⚠️️️⚠️️️⚠️️️ END');
  if(typeof message === 'string') {
    console.error('- - -');
    console.error(message);
    console.error('- - -');
  }
}

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
        handleError(error, ' ❌ credentials invalid - try again...');
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
      case 'get-board': getBoard(loopActionSelection); break;
      case 'delete-board (close)': deleteBoard(loopActionSelection); break;
      case 'create-list': createList(loopActionSelection); break;
      case 'get-lists': getBoardLists(loopActionSelection); break;
      case 'get-list': getList(loopActionSelection); break;
      case 'create-card': createCard(loopActionSelection); break;
      case 'get-card': getCard(loopActionSelection); break;
      case 'get-all-cards': getAllCards(loopActionSelection); break;
      case 'get-cards-by-list': getCardsByList(loopActionSelection); break;
      case 'get-cards-by-board': getCardsByBoard(loopActionSelection); break;
      case 'get-profile': getProfile(loopActionSelection); break;
      case 'exit': process.exit(0); break;
      default:
        console.error('An invalid action was selected.');
        loopActionSelection();
    }
  });
};

function getCredentialsLoopTillSuccess(callback) {
  inquirer.prompt(questions.credentials)
    .then((answers) => {
      const {apiKey, token} = answers;
      taabInstance = taab.init(apiKey, token);
      console.info(' - - verifying key and token - - ');
      taabInstance.verify()
        .then(() => {
          console.info(' ✅ credentials valid');
          callback();
        })
        .catch((error) => {
          handleError(error, ' ❌ credentials invalid - try again...');
          getCredentials(callback);
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
  inquirer.prompt([
    {
      type: 'input',
      name: 'boardName',
      message: 'What name shall we give it?',
    },
  ]).then((answers) => {
    taabInstance.createBoard({
      name: answers.boardName,
    })
      .then((res) => {
        console.log(res);
        const descriptionAndLink = `"${res.desc}" ( 👉🏽 ${res.url} || ${res.shortUrl})`;
        console.info(` ✅ board ['${res.name}'] was created with description ${descriptionAndLink}`);
      })
      .catch(handleError)
      .finally(callback);
  });
};

function getBoards(callback) {
  taabInstance.getBoards()
    .then((res) => {
      const boards = res.map((item) => {
        return `\n${item.id} [ ${item.name} ](${item.url})${item.closed?' - CLOSED':''}`;
      });
      console.log(res);
      console.info(` ✅ [${res.length}] boards retrieved:\n\n${boards}`);
    })
    .catch(handleError)
    .finally(callback);
};

function getBoard(callback) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'boardId',
      message: 'Paste the board ID here',
    },
  ]).then((answers) => {
    const {boardId} = answers;
    taabInstance
      .getBoard({
        boardId,
      })
      .then((res) => {
        console.log(res);
        console.info(` ✅`);
      })
      .catch(handleError)
      .finally(callback);
  });
};

function deleteBoard(callback) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'boardId',
      message: 'Paste the board ID here',
    },
  ]).then((answers) => {
    const {boardId} = answers;
    taabInstance
      .deleteBoard({
        boardId,
      })
      .then((res) => {
        console.log(res);
        console.info(` ✅`);
      })
      .catch(handleError)
      .finally(callback);
  });
};

/** ----------------------
  _    ___ ___ _____ ___ 
 | |  |_ _/ __|_   _/ __|
 | |__ | |\__ \ | | \__ \
 |____|___|___/ |_| |___/
                         
---------------------- **/

function createList(callback) {
  inquirer.prompt([
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
  ]).then((answers) => {
    taabInstance
      .createList({
        idBoard: answers.boardId,
        name: answers.boardName,
      })
      .then((res) => {
        console.log(res);
        console.info(` ✅ list [ID: ${res.id}]`);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(callback);
  });
};

function getBoardLists(callback) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'boardId',
      message: 'Paste the board ID here',
    },
  ]).then((answers) => {
    taabInstance
      .getBoardLists({
        boardId: answers.boardId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch(handleError)
      .finally(callback);
  });
};

function getList(callback) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'listId',
      message: 'Paste the list ID here',
    },
  ]).then((answers) => {
    taabInstance
      .getList({
        listId: answers.listId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch(handleError)
      .finally(callback);
  });
}

/** -----------------------
   ___   _   ___ ___  ___ 
  / __| /_\ | _ \   \/ __|
 | (__ / _ \|   / |) \__ \
  \___/_/ \_\_|_\___/|___/
                          
----------------------- **/

function createCard(callback) {
  inquirer.prompt([
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
  ]).then((answers) => {
    taabInstance
      .createCard({
        idList: answers.listId,
        name: answers.listName,
      })
      .then((res) => {
        console.log(res);
        console.info(` ✅ list [ID: ${res.id}]`);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(callback);
  });
};

function getCard(callback) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'cardId',
      message: 'Paste the card ID here',
    },
  ]).then((answers) => {
    taabInstance
      .getCard({
        cardId: answers.cardId,
      })
      .then((res) => {
        console.info(res);
      })
      .catch(handleError)
      .finally(callback);
  });
}

function getAllCards(callback) {
  taabInstance
    .getAllCards()
    .then((res) => {
      console.log(res);
    })
    .catch(handleError)
    .finally(callback);
};

function getCardsByList(callback) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'listId',
      message: 'Paste the list ID here',
    },
  ]).then((answers) => {
    taabInstance
      .getListCards({
        listId: answers.listId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch(handleError)
      .finally(callback);
  });
};

function getCardsByBoard(callback) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'boardId',
      message: 'Paste the board ID here',
    },
  ]).then((answers) => {
    taabInstance
      .getBoardCards({
        boardId: answers.boardId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        handleError(error,
          `${error.response.statusCode} - ${error.response.error.text}`
        );
      })
      .finally(callback);
  });
}

function getProfile(callback) {
  taabInstance.getProfile()
    .then((res) => {
      console.info(res);
    })
    .catch(handleError)
    .finally(callback);
};
