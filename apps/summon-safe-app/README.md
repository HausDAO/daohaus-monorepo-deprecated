# Summon Safe App

[Summon Safe App](./summon-safe-app/) is a Vite React application with TypeScript. Summoner is a tool for summoning DAOs using the Baal (Moloch v3) contract. This is meant to be a standalone tool for users owning existing Gnosis Safes to summon new DAOs on supported chains.

## Overview

The Summoner Safe App is a Vite React application that we deploy to [Skynet](https://skynetlabs.com/). We designed this to be as decentralized an app as possible, and the Vite app is able to be built and hosted on any hosting service. We currently deploy to Skynet, but a user would be able to host their own Hub app if they ever needed to.

This app utilizes several Gnosis Safe & Zodiac libraries as well as a couple of our onw libraries.

## Alpha Features

The Summon Safe App is a tool for summoning Baal DAOs right from the Gnosis Safe web interface.

## Running Locally

To run Summoner locally, clone the monorepo and use `nx run summon-safe-app:serve` to run a local server on `localhost:3000`. This will start a local server and development environment. Then:

* Go to the [Gnosis Safe Web interface](https://app.gnosis-safe.io/)
* Create a test safe on Goerli if needed
* Go to Apps -> Manage Apps -> Add Custom App
* Paste your localhost URL, default is http://localhost:3000/
* You should see DAOHaus: DAO Launcher as a new app
* Develop the app from there

## Deploying to Production

Summon Safe App uses Vite as the build tool, so if you're not familiar with Vite we recommmend exploring the [Vite documentation](https://vitejs.dev/guide/).
