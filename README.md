# Simple load Giphy Trending
Load giphy trending images.

### 1. Make sure you've installed:
> Nodejs [Download]((https://nodejs.org/en/download/)

> [Webpack](https://webpack.github.io/docs/installation.html)

### 2. I suggest you using [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) to check dependencies's updates

### 3. Installation
```bash
npm install
```
If you face to problem while installing dependencies relating to "ERR! self signed certificate in certificate chain", please refer to http://blog.npmjs.org/post/78165272245/more-help-with-selfsignedcertinchain-and-npm

In case you install successfully but display empty page when running app, inspect element received an error like: "Uncaught TypeError: Cannot read property 'async' of undefined", please run install command again

### 4. Linter to check syntax
```bash
npm run lint
```

### 5. Build
```bash
npm run build
```

### 6. Site
Development site url: http://localhost:8000/

#### a. Run in Dev mode
```bash
npm run dev
```

#### b. Run in Production mode
```bash
npm run prod
```

#### c. Unit test
**For Developer**
Should use this command to run unit test, because it doesn't uglify javascript code.

```bash
npm run test
```
For debugging, opent this url on chrome: http://localhost:9001/debug.html
*Note: this command doesn't generate code coverage*

 **For CI tool**
```bash
npm run coverage
```
Code coverage folder: **/coverage/app/**
