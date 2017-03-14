# BEE plugin wrapper [![Build Status](https://travis-ci.org/samuv/bee-plugin.svg?branch=master)](https://travis-ci.org/samuv/bee-plugin.svg?branch=master)
A really simple module for use the BEE editor [www.beefree.io](http://beefree.io/plugin/)

## What the hell is BEE?
Long story short is a drag-&-drop editor for responsive design emails.
It makes easy and quick to create a great-looking email message that can be used to send a company newsletter, announce a new product, promote a sale, etc.

You can embed into your application :)
BEE have a free version so you can embed the editor anywhere, regardless of pricing model.

## How to use it

- go to developer portal ['https://developers.beefree.io/signup'](https://developers.beefree.io/signup)
- sign up with the free plan
- create your application
- get clientId and clientSecret

## Demo

It's free to use on ['https://beefree.io'](https://beefree.io): you don't even need to create an account of any kind.


## Do you want try out an integration locally?

1. Install [Node][node] and [npm][npm].
2. clone this repository
3. `npm install` or `yarn install` in the folder cloned
4. put your clientId and clientSecret on ./config/integrationKeys.js
5. `npm start`
6. Open `http://localhost:3030`.
7. Have fun!


## You want this module for your project?

### install

> You can either install it with [npm](https://nodejs.org) or [yarn](https://yarnpkg.com).

```sh
npm install --save bee-plugin
```
or
```sh
yarn add bee-plugin
```

## Get token
> You need to be authorize to start with the editor, learn more [here](http://help.beefree.io/hc/en-us/articles/202991192-Initializing-the-plugin)

It is not raccomended to do it client side but is possible with the module, just call getToken

```js
import Bee from 'bee-plugin'

const beeTest = new Bee()

beeTest.getToken(clientId, clientSecret)

```

## Initialize the plugin
> initialize the instance of BEE with a token generate server side

```js
import Bee from 'bee-plugin'

const beeTest = new Bee(token)

```

## Configuring the editor
> It required a configuration for using the editor, learn more [here](http://help.beefree.io/hc/en-us/articles/202991192-Initializing-the-plugin)

Here an example of configuration, read the official documentation for extended

```js

const beeConfig = {
  uid: 'test1-clientside', //needed for identify resources of the that user and billing stuff
  container: 'bee-plugin-container', //Identifies the id of div element that contains BEE Plugin
  language: 'en-US',
  onSave: (jsonFile, htmlFile) => {
    console.log('onSave', jsonFile, htmlFile)
  },
  onSaveAsTemplate: (jsonFile) => {
    console.log('onSaveAsTemplate', jsonFile)
  },
  onSend: (htmlFile) => {
    console.log('onSend', htmlFile)
  },
  onError: (errorMessage) => {
    console.log('onError ', errorMessage)
  }
}

```

## Template JSON
> It required a initial template for start editing, learn more [here](http://help.beefree.io/hc/en-us/articles/203135882-Sample-code-and-templates)

Some json avaible here  [https://github.com/BEE-Plugin/BEE-FREE-templates](https://github.com/BEE-Plugin/BEE-FREE-templates)

## Methods

### getToken(clientId, clientSecret)

Pass your keys on parms and return a promise, example:

```js
const clientId = 'MYclientId'
const clientSecret = 'MYclientSecret'
const beeConfig = {...}
const template = {...}
const beeTest = new Bee()

beeTest.getToken(clientId, clientSecret)
.then(() => {
  .then((res) => res.json()) //return fetch promise
  .then((template) => beeTest.start(beeConfig, template))
})

```

### new Bee(token)
Initialize a classe with token that are store on constructor

### start(beeConfig, template)
After the initizalization you can call start for create the editor on page, the method need two params:

- BEE configuration (js object)
- Template (JSON)

### load(template)
After you have started the editor is possible to change the template, just calling load with the new template

### save()
After you have started the editor is possible to trigger the save that trigger the callback onSave define on the configuration for getting fresh HTML of the email and the json template updated.

### saveAsTemplate()
After you have started the editor is possible to trigger the saveAsTemplate that trigger the callback onSaveAsTemplate define on the configuration for getting only the current json of the instance.


## Test (WIP)
```sh
npm test
```
or
```sh
yarn test
```


[node]: https://nodejs.org/en/
[npm]:  https://www.npmjs.com/
[yarn]: https://yarnpkg.com
