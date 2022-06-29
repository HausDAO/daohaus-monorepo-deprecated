# Hub App

[Hub App](./hub-app/) is a Vite React application with TypeScript. Hub is a "landing page" or "dashboard" for users to interact with their DAOs. It's an overview of the DAOs that their in, and there are some social elements such as a public facing profile.

## Overview

The Hub App is a Vite React application that we deploy to [Skynet](https://skynetlabs.com/). We designed this to be as decentralized an app as possible, and the Vite app is able to be built and hosted on any hosting service. We currently deploy to Skynet, but a user would be able to host their own Hub app if they ever needed to.

This app utilizes several of our libraries, including _DAOhaus Connect_, the _DAO Data SDK_, and our _DAOhaus Component Library_. The Hub queries our subgraphs as well as [Ceramic](https://ceramic.network/) and displays a user's basic profile information if they one set with [self.id](https://self.id/).

## Alpha Features

At the core, the Hub Alpha app is a place for user's to get a high-level dashboard view of the DAOs that they're in. There are Profile features in the Alpha as well, where users are able to view a public-facing profile for other folks. Profiles leverage Ceramic and can be edited by navigating to [self.id](https://self.id/).

When users connect to Hub, they'll be able to view the following:

- **Profile**
  - If it is set. If not we utilize certain fallbacks to display basic information.
- **DAO Data Feed**
  - After users connect their wallet, they'll be able to view a list of DAOs that they're in with important information displayed. This includes:
    - DAO name
    - Proposal Count
    - Vault Balance
    - Members
    - Voting Power
    - Network
    - Delegate
      - Hub also indicates if the connected user is a delegate of the DAO

The core purpose of the Hub is for users to have a landing page for viewing data for DAOs that they're in.

## Running Locally

To run Hub locally, clone the monorepo and use `nx run hub-app:serve` to run a local server on `localhost:3000`. This will start a local server and development environment. Hub uses Vite as the build tool, so if you're not familiar with Vite we recommmend exploring the [Vite documentation](https://vitejs.dev/guide/).
