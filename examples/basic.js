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

function getCredentials() {
  const deferred = q.defer();
  getCredentialsLoopTillSuccess(deferred.resolve);
  return deferred.promise;
};

function loopActionSelection() {
  inquirer.prompt(questions.possibleActions).then((answers) => {
    const {action} = answers;
    switch (action) {
      case 'create-board': createBoard(loopActionSelection); break;
      case 'get-boards': getBoards(loopActionSelection); break;
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
          _getCredentials(onSuccess);
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

function getBoards(callback) {
  taabInstance.getBoards()
    .then((res) => {
      const boards = res.map((item) => {
        return `[ ${item.name} ]( ${item.url} )\n`;
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
