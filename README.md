<p align="center">
    <a href="https://www.vespaiach.com/">
        <img src="https://raw.githubusercontent.com/vespaiach/ledger/main/src/favicon.svg" height="56" width="56" title="Ledger"/>
    </a>
</p>

<p align="center">
  <b>Ledger</b> is a web application managing personal money balance
</p>

<br>

# Live Playground

The demo version at: https://ledger.dedyn.io/

# Development

1.  Clone back-end server repository [ledger-graphql](https://github.com/vespaiach/ledger-graphql)
2.  Download this repository:
    - Create `.env` file with variable `VITE_GRAPHQL_URL=<back-end url>`
    - Run web-app with command `npm run dev`

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
