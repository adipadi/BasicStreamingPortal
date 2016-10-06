# Vimond CMS

Next generation VCC.

## Prerequisites

You'll need
  * node >= 4.0.0 (but no newer than 5.5.0, currently)
  * grunt

### Install grunt-cli.

```javascript
$ npm install -g grunt-cli
```

## Getting started

### Set the Vimond registry
```
$ npm config set registry http://vimond.artifactoryonline.com/vimond/api/npm/npm-virtual
```
(To set it back to the standard NPM registry, use the address https://registry.npmjs.org/)

### Install dependencies

```javascript
$ npm install
```

## Build

```javascript
$ npm run build
```

## Running the app

To start the app locally you need to run two processes:

```javascript
$ npm run start-dev // Starts the container
```

Note that `npm run start` command will also do a complete build, so you might
want to skip the step above.

Then run the webpack build and hot reload process:

```javascript
$ npm run dev
```

Open the app: [http://localhost:8080/](http://localhost:8080/)

The backend/API will be [available on port 3080](http://localhost:3080).

### Available commands

Prefix all commands with `npm run`.

* `test` Runs the tests
* `test-server` Same as `test`
* `test-frontend` Runs frontend tests
* `lint` Checks the source code for correct style
* `start` Just runs `node src/server/server.js`
* `start-dev` **Deprecated. Use `start-backend` instead** ~~Starts the backend with a predefined set of configuration variables~~
* `start-backend` Starts the backend with a predefined set of configuration variables. For development purposes. Use *migrate-start* to start in production mode.
* `start-dev-db` Same as above but with a local Postgres DB, too
* `start-dev-no-jwt` Same as `start-dev` but without JWT secret
* `build` Builds the code
* `deploy` Builds the code ready for deployment
* `dev` Builds the code for development
* `deploy:imageselector` Builds image selector
* `test:watch` Runs `test` and re-runs tests when code changes
* `migrate` Runs database migrations
* `migrate-dev` Runs database migrations with predefined dev credentials
* `migrate-start` Migrates the database then starts the app **in production mode**.
* `revision` Gets version info from Git and writes it to `revision.json`

## Running tests
```javascript
$ npm test
```

## Configuration

If you need to change the configuration (URLs, API keys etc), these need to be
set as environment variables.

If you run the app using `npm`, you can modify the command line in `package.json`.
Here you can also set whatever environment variables you might like in the
`betterScripts` section.

Please refer to `config.js` for a list of environment variables available.


## Frontend feature toggles

For frontend feature toggles, please refer to `feature_toggles.js` for a list of
available feature toggles that can be set using `ENV` settings and/or modified
using the dev UI.

To open the dev UI in the browser console, type `showdevui()`.

Local changes to feature toggles are persistent and overrides
default values. You can always revert to default settings with the reset button.

## More docs

For more documentation go [here](http://files.vimond.com/docs/vimond-cms/).
