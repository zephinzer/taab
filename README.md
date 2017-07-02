# Trello-As-A-Backend
TAAB is a data persistence module that you can `npm install` and use it as a data
persistence mechanism.

## Get Trello Developer Keys
1. Get your Trello Developer API Key from https://trello.com/app-key
2. Obtain a personal development Token from https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=`<Trello Developer API Key>`
3. You should now have a Developer API Key and a personal Token

## Get Started
Install TAAB by `npm` or `yarn`:

```bash
# npm install taab
# /
# yarn add taab
```

Initialize the module:

```javascript
const taab = require('taab');
const taabInstance = taab.init(TRELLO_DEVELOPER_API_KEY, TRELLO_PERSONAL_TOKEN);
```

Get started by using `taabInstance`!

## API Documentation
### Static
#### `.init()`
##### Arguments
- :apiKey
- :token

###### apiKey
The Developer API Key obtained from https://trello.com/app-key

###### token
Your personal development token obtained from https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=`<Trello Developer API Key>`

### Instance
#### `.getBoards()`
Retrieves all boards belonging to yourself.
##### Arguments

##### Example
```javascript
taabInstance.getBoards()
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

#### `.getCards()`
Retrievs all cards belonging to yourself.

##### Arguments
None

##### Example
```javascript
taabInstance.getCards()
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

#### `.getMember()`
Retrieves a member given a Trello user ID
##### Arguments
- :memberId

##### Example
```javascript
taabInstance.getMember('3892e8asd7ea8bc231')
  .then((results) => { console.info(results); })
  .catch((error) => { console.error(error); });
```

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

## Changelog
### 3rd July 2017
Published 0.2.0.

➕ static.init()

➕ instance.getMember()

➕ instance.getProfile()

➕ instance.getBoards()

➕ instance.getOrganisations()

➕ instance.getOrganizations()

➕ instance.getCards()
