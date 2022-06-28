# DAOhaus v3 Monorepo

DAOhaus is a no-code platform for summoning and managing Moloch DAOs. We've worked to reimagine our platform into multiple apps, libraries, and microservices. We're using a monorepo to streamline the development of all of these elements, and we used [Nx](https://nx.dev) to scaffold our monorepo.

If you've a bug to report or want to contributes, jump to the 🙏 We need your help to make DAOhaus even better section below for more information.

If you'd like to join our community, we coordinate on [Discord](https://discord.gg/gWH4vt3tWE).

## Packages

Our monorepo follows the [recommended Nx structure](https://nx.dev/structure/applications-and-libraries) with `apps` and `libs` folders. The `apps` folder contains our core applications, subgraphs, and infrastructure jobs. The `libs` has our utilities, librarires, and infrastructure resources.

### Apps

Our applications in the `apps` folder are our DAO infrastructure and leverage our libraries, subgraphs, and contracts. Currently, we have two categories for these applications:

- **User Interfaces**: These are our applications that are used to interact with DAOs.
  - Hub App
  - Summoner App
- **Deployed Infrastructure**: These are our jobs and subgraphs and are deployed to provide functionality leveraged throughout our other applications.
  - DAO Producer Job
  - v3 Subgraph

#### [Hub App](./apps/hub-app)

- Vite React application with Typescript

Entry point: `apps/hub-app`

#### [Summoner App](./apps/summon-app/)

- Vite React application with Typescript

Entry point: `apps/summon-app`

#### [DAO Producer Job](./apps/dao-producer-job)

Entry point: `apps/dao-producer-job`

#### [v3 Subgraph](./apps/v3-subgraph/)

Entry point: `apps/v3-subgraph`

Entry point: `apps/summoner-app`

### Libs

Our libraries in the `libs` folder are structured to be consumed by our apps as well as used by external developers using our tooling. Currently, we have three categories of libraries:

- **Utility Libraries**: These are libraries that are used to provide foundational utility that can be composed and integrated into applications.
  - Helm Chart Infrastructure Playbook
  - DAO Data SDK
  - Component Library
- **Feature Libraries**: These compose together other libraries such as the _DAO Data SDK_ and the _Component Library_ to create "smart components" that can be integrated into applications.
  - DAOhaus Connect
  - Tx Builder

#### [DAO Data SDK](./libs/dao-data-sdk)

Entry point: `libs/dao-data-sdk`

#### [Component Library (UI)](./libs/ui)

Entry point: `libs/ui`

#### [DAOhaus Connect](./libs/daohaus-connect-feature)

Entry point: `libs/daohaus-connect-feature`

#### [Tx Builder](./libs/tx-builder-feature)

Entry point: `libs/tx-builder-feature`

#### [Helm Chart Infrastructure Playbook](./libs/infra-chart)

Entry point: `libs/infra-chart`

## Getting Started
