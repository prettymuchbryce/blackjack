# Basic BlackJack API

A simple API which allows a user to play blackjack against a dealer.

## Installation

1. Pull code
2. `npm install`
3. `npm start`

## Tests

Requires Mocha, and Chai.

`npm test`

## Features

Player may start a game, and choose to hit or stand.

- There is no doubling down on hands
- There is no insurance
- There is no splitting
- There is no betting

## Curl Requests

### New Game (GET)

`curl 'http://127.0.0.1:3000/new' -H 'Content-Type: application/json'`

### Hit (POST)

*Use the id you received from creating a new game to hit and stand.*

`curl 'http://127.0.0.1:3000/hit' -H 'Content-Type: application/json' -d '{ "id": "1z" }'`

### Stand (POST)

*Use the id you received from creating a new game to hit and stand.*

`curl 'http://127.0.0.1:3000/stand' -H 'Content-Type: application/json' -d '{ "id": "1z" }'`