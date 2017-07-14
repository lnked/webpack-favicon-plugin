# Webpack Favicon Plugin

```bash
yarn add -D git+ssh://git@gitlab.com/lnked/webpack-favicon-plugin.git#0.0.2

```

```js
const FaviconWebpackPlugin = require('webpack-favicon-plugin')

plugins: [
    new FaviconWebpackPlugin({
        logo: 'logo.svg'
        /* options here */
    })
],
...

```