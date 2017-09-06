# Creativite Solution for Webtrekk angularjs task

well, i tried to come up with something a bit out of box to make this task more interesting.

- for build system i used Node.JS & express, its pretty fast too !
- For hotreload support i included socket.io to dev version!
- Followed a variation of John Papp's style guide,
- i lock `src/app.js` file to only be editatble by team leader. and include an automated build system that scan all components inside src folder and auto import them.
- Karma unit tests
- hardcoded data are found in /mocks

with this setup we can let multilple teams work on multiple sections of monolithic app, with complete separation they don't even have to be in same repo.

## in nutshell

all components depends on `src/app.js`  while `src/app.js` depends on only 3rd parties.

`app.js` is the entry file for all components, all components will inherit from it, this is place to add global configuration; only one person should be respobsible for updating this file because it will affect all components.

if any component fail; it will fail silently without freezing/affecting whole app

-- this is an concept i just came up with i think it should work !--


## Getting started

to run both tests and production server
```shell
yarn dev
```

to run server and hotreload
```
yarn start
```