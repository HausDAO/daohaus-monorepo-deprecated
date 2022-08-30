# DAOhaus Connect

Package name: `daohaus-connect`

**DAOhaus Connect** is our first feature library. Our feature libraries are a step beyond our component library, and either include additional functionality or leverage the DAO Data SDK to create "smart components." DAOhaus Connect provides a drop-in component for handling wallet connection, and includes additional functionality such as notifying users of unsupported networks, switching networks, and displaying basic [Ceramic profile](https://ceramic.network/) data if the user has one set.

This is used throughout our applications and is designed to be leveraged by the larger DAOhaus community as a portal into the DAOhaus ecosystem.

This library was generated with [Nx](https://nx.dev).

## Installation

When this package is published on `npm` we'll have instructions on how to include it in your apps. If you're using this from inside the monorepo, you can import directly from the package.

The package name for importing is `@daohaus/daohaus-connect-feature`. If you've pulled down the entire monorepo you can reference it via this namespace, such as `import { HausConnectProvider } from '@daohaus/daohaus-connect-feature'`.

## Usage

DAOhaus Connect provides lots of drop-in functionality for handling wallet connection and associated functionlity such as working with the connected user's address, managing network configuration, and handling supported/unsupported networks.

This is a React package and it works within React apps. We've used it with our Vite React apps, so this also works with Vite's `esbuild` based approach.

### HausConnectProvider Context Provider

Start by importing the `HausConnectProvider` component from the `@daohaus/daohaus-connect-feature` package at your app's root component, such as `main.tsx`:

```jsx
// main.tsx

import { HausConnectProvider } from '@daohaus/daohaus-connect-feature';
```

Once imported you can use it as you would any other Context Provider:

```jsx
// main.tsx

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <HausConnectProvider>
        <App />
      </HausConnectProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)
```

After including the `<HausConnectProvider/>` component in your app, you'll be able to access the associated Context throughout your app.

### Connecting to a Wallet

DAOhaus Connect exposes several useful tools that can be used throughout your app. You can access these by importing `useHausConnect` from DAOhas Connect:

```jsx
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
```

Once this is imported, you can destructure out useful tools, such as `connectWallet`:

```jsx
const { connectWallet } = useHausConnect();
```

This can then be passed into any Button with an `onClick` handler:

```jsx
<Button onClick={connectWallet} sm type="button">
  Connect
</Button>
```

There are other useful tools such as interacting with Ceramic that we'll continue to add to the documentation.

## Examples

We use DAOhaus Connect in both our Hub and Summon apps.
