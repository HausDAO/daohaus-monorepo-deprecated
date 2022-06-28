# DAOhaus v3 Monorepo

DAOhaus is a no-code platform for summoning and managing Moloch DAOs. We've worked to reimagine our platform into multiple apps, libraries, and microservices. We're using a monorepo to streamline the development of all of these elements, and we used [Nx](https://nx.dev) to scaffold our monorepo.

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

Our monorepos use [Nx](https://nx.dev/) as a build system and for scaffolding. If this your first time using Nx, you'll have to install it globally on your system:
`npm install -g nx`

Here is a basic guide. Each package README (and `project.json`) will have more details about commands within each package.

```bash

`git clone git@github.com:HausDAO/daohaus-monorepo.git` or `git@github.com:HausDAO/daohaus-monorepo.git`

# clone the entire monorepo at the top level on the develop branch

`yarn`
# run yarn to install all of the packages and dependencies

```

Once cloned and everything is installed, you'll be able to run each package! Package-level commands are run with `nx run` instead of `yarn` -- this may be new if you're used to working in a different monorepo structure. Each package has similar command structure, but some packages have additional commands.

The package-level commands can be found in each package's `project.json`.

```bash

# run a specific package locally (usually on localhost:3000)
# such as the component library or frontend applications

nx run app-name:serve

# example to run the Hub app:

nx run hub-app:serve

# lint a specific package

nx run app-name:lint

# example to lint the Hub app:

nx run hub-app:lint

# build a specific package:

nx run app-name:build

# example to build the Hub app:

nx run hub-app:build

```

## Nx Generators
