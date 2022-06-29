# Component Library (UI)

Our [Component Library (UI)](./libs/ui) is a set of React components with TypeScript leveraging [Radix UI](https://www.radix-ui.com/) primitives. This library roughly follows [Atomic Design principles](https://bradfrost.com/blog/post/atomic-web-design/), and are intended to be composed together to build application UI.

This library includes a [Storybook](https://storybook.js.org/) as well and is intended for use by the larger DAOhaus community. Since we "dogfood" our own package development we're continually adding to this library as we surface new components.

This library was generated with [Nx](https://nx.dev).

## Installation

When this package is published on `npm` we'll have instructions on how to include it in your apps. If you're using this from inside the monorepo, you can import directly from the package.

The package name for importing is `@daohaus/ui`. If you've pulled down the entire monorepo you can reference it via this namespace, such as `import { HausThemeProvider } from '@daohaus/ui'`.

## Usage

DAOhaus UI provides a theme Context Provider as well as a set of UI components that can be imported and used to build app UI.Start by importing the `HausThemeProvider` from the `@daohaus/ui` package at your app's root component, such as `main.tsx`:

### HausThemeProvider Context Provider

```jsx
// main.tsx

ReactDOM.render(
  <StrictMode>
    <HausThemeProvider>
      <HashRouter>
        <HausConnectProvider>
          <Routes />
        </HausConnectProvider>
      </HashRouter>
    </HausThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
```

Eventually this will support multiple themes that can be passed into the `<HausThemeProvider/>` but for now it only includes the default theme. Once this is imported, your app will inherit all of the default theme styles and tokens.

### Importing Components

Individual components are exported as named exports from the `@daohaus/ui` package. You can use them in your app by importing them into a component:

```jsx
// Component.tsx

import { Button } from '@daohaus/ui';
```

We have a Storybook with stories for each exported component showcasing the props and variants. All of our components are written with TypeScript so you'll be able to have TypeScript "hints" in your code editor when using them.

## Components Overview
