<p>
    <a href="https://ledger.dedyn.io/">
        <img src="https://github.com/vespaiach/ledger/blob/fbcb48e0e17775c4f50340b8eee249ed46725059/sneakview.gif" height="500"  title="Ledger app"/>
    </a>
</p>

<p>
  <b>Ledger</b> is a web application for managing personal money transactions
</p>

# Playground

The demo version at: https://ledger-react.herokuapp.com with demo account: `tester/12345`

# Features

- Mobile devices friendly
- Support endless-scrolling (using [Virtuoso](https://virtuoso.dev/))
- Easily to filter transactions

# Future Features

- Support offline mode. Use IndexDb to store database
- Add quick-navigation bar to jump to any segment
- Update filter pane with more beautiful UIs
- Add reports/ charts

# Development

1.  Clone and run back-end server repository [ledger-graphql](https://github.com/vespaiach/ledger-node-graphql)
2.  Clone this repository:
    - Create `.env` file with variable `VITE_GRAPHQL_URL=<back-end url>`
    - Run `npm run gentype`
    - Run web-app with command `npm run dev`

# Tech Stack

- ReactJs / Typescript
- ZustandJs
- RxJs
- ViteJs

# NPM Commands

| Command         | Note                                                                          |
| --------------- | ----------------------------------------------------------------------------- |
| npm run dev     | run app locally for development                                               |
| npm run build   | build project and output to dist folder                                       |
| npm run gentype | use graphql-codegen to generate typing                                        |
| npm run start   | use `serve` tool to serve static server. It's ready for Heroku deployment too |

# License

See the [MIT license](https://github.com/vespaiach/ledger/blob/main/LICENSE) file.
