<p align="center">
    <a href="https://www.vespaiach.com/">
        <img src="https://raw.githubusercontent.com/vespaiach/ledger/main/ledger.svg" height="56" width="56" data-canonical-src="https://www.vespaiach.com/ledger.svg" title="Ledger"/>
    </a>
</p>

<p align="center">
  <b>Ledger</b> is a small web application managing personal money balance
  <br>
  It is built with React/Redux and awesome GUI framework: <a href="https://github.com/mui-org/material-ui" title="Material UI">Material UI</a>
</p>

<br>

# Live Playground

The demo version at: https://in-out-money.herokuapp.com/ 

# Development

To run web app at local, 
 1. You need to download and run back-end server [ledger-graphql](https://github.com/vespaiach/ledger-graphql)
 2. Download this repository:
    - Create `.env` file with variable `REACT_APP_LEDGER_GRAPHQL_API=<back-end url>`
    - Run web-app with command `yarn start`

This web application is bootstraped with [cra](https://create-react-app.dev/). Some of frameworks and libraries are using in this web application:

 - React
 - Redux/Redux Saga
 - Material UI (v5.x)
 - Graphql Codegen
 - Appolo Client

# Heroku deployment

## Create a new app on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/vespaiach/ledger)


## Manually deploy

Using heroku cli

```
heroku git:remote -a <your_heroku_app_name>
heroku buildpacks:add -a <your_heroku_app_name> mars/create-react-app
git push heroku main
```