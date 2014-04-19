# Basic BlackJack API

A simple API which allows a user to play blackjack against a dealer.

## Features

Player may start a game, then choose to hit or stand.

- There is no doubling down on hands
- There is no insurance
- There is no splitting
- There is no betting

## Installation

1. `git clone git@github.com:prettymuchbryce/blackjack.git`
2. `cd blackjack`
3. `npm install`
4. `npm start`

## Curl Requests

### New Game (GET)

`curl 'http://127.0.0.1:3000/new' -H 'Content-Type: application/json'`

### Hit (POST)

*Use the id you received from creating a new game to hit and stand.*

`curl 'http://127.0.0.1:3000/hit' -H 'Content-Type: application/json' -d '{ "id": "1z" }'`

### Stand (POST)

*Use the id you received from creating a new game to hit and stand.*

`curl 'http://127.0.0.1:3000/stand' -H 'Content-Type: application/json' -d '{ "id": "1z" }'`


## Tests

Requires Mocha

`npm test`
