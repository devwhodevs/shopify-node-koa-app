
# Shopify Node Koa App

The goal of this example app is to provide a starting point for Shopify app developers so that they will be able to quickly spin up an embedded 
Shopify app using Node and KOA and get started using the Polaris design system and React components.

This example app uses Node, KOA, Webpack, React, and Shopify/polaris

## Features
- [x] React app using [Polaris](https://polaris.shopify.com/)
- [x] Shopify Authentication based on Koa

## Commands
- `npm start` Build React and run the server with nodemon watch
- `npm build` Build React

## Running the project locally

### Install project dependencies
- Install Node.js version 8.1.0 or higher.
- Install project dependencies with `npm install`

### Allow your app to talk to Shopify
- Create a tunnel to localhost:4000 using [forward](https://forwardhq.com/) or [ngrok](https://ngrok.com/)
- Note the tunnel url (we’ll refer to it as `HOST`)

### Register your app in the Partner Dashboard
- Sign into your [Shopify Partner Dashboard](https://partners.shopify.com/organizations)
- Click 'Apps' in the sidebar and create a new app
- Set the app url to `{{ HOST }}/`
- Set the whitelisted URL to `{{ HOST }}/shopify/auth/callback`
- Go to extensions tab and enable “Embed in Shopify admin”
- Copy `API Key` and `App Secret` from app settings

### Configure and add to a store
- Open `.env` and
  - Set Add HOST from your tunnel service as `SHOPIFY_APP_HOST`
  - Add the api key from partners dash as `SHOPIFY_API_KEY`
  - Add the api secret from partners dash as `SHOPIFY_SECRET`
- Open `client/src/App.jsx` and
   - Add the api key from partners dash as `apiKey` in AppProvider component parameter 
- Run `npm install && npm start` or, if you prefer `yarn install && yarn start`
- Open a browser to `{{ HOST }}/install`
- Enter your store’s domain and hit install
- 🚀 🎉

## Architecture

There are three main sections that provide the foundations for this example. They are organized as follows:

### `server`
This folder provides the Koa 2 server as well as a basic view.
The server provides basic endpoints for installation and authentication in Shopify as public app, hosting the React app.

The code here is mostly glue code, with the bulk of the actual functionality provided by the modules in `koa-shopify-auth`.

### `koa-shopify-auth`
This example app consumes the [koa-shopify-auth](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-auth) library to quickly connect to the Shopify API.

### `shopify-api-node`
This example app uses the Official [shopify-api-node](https://github.com/MONEI/Shopify-api-node) library to connect to the Shopify API.

### `client`
This folder contains the UI demo using Polaris React components.

### `bin`
This folder conatins appliaction starter point