# Apps

Our applications in the `apps` folder are our DAO infrastructure and leverage our libraries, subgraphs, and contracts. Currently, we have two categories for these applications:

- **User Interfaces**: These are our applications that are used to interact with DAOs.
  - Hub App
  - Summoner App
- **Deployed Infrastructure**: These are our jobs and subgraphs and are deployed to provide functionality leveraged throughout our other applications.
  - DAO Producer Job
  - v3 Subgraph

## Hub App

[Hub App](./hub-app/) is a Vite React application with TypeScript. Hub is a "landing page" or "dashboard" for users to interact with their DAOs. It's an overview of the DAOs that their in, and there are some social elements such as a public facing profile.

## Summon App

[Summon App](./summon-app/) is a Vite React application with TypeScript. Summoner is a tool for summoning DAOs using the Baal (Moloch v3) contract. This is meant to be a standalone tool for users to summon new DAOs on supported chains.

## DAO Producer Job

Coming soon.

## v3 Subgraph

Coming soon.
