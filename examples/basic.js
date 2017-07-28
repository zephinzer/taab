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
};

let taabInstance = null;

(function main() {
  getCredentials()
    .then(loopActionSelection);
})();

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
}

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

function getLists(callback) {
  inquirer.prompt(questions.getLists).then((answers) => {
    taabInstance //595912dee6c8dde18caa02d8
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
}

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
