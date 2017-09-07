# Creative Solution for Webtrekk angularjs task

well, I tried to come up with something a bit out of the box to make this task more interesting.

## Details

- Recived Task: Sept 4th 2017
- Deadline     : Sept 7th 2017
- Specs :  [exercise_angularjs_eng.pdf](../exercise_angularjs_eng.pdf)


## working demo

you can deploy directly to heroku.
[https://salty-brushlands-18464.herokuapp.com/](https://salty-brushlands-18464.herokuapp.com/)

[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=https://salty-brushlands-18464.herokuapp.com/data/4) = 88/100

## Work done

- custom build system using only Node.Js
  - Great Modularity and Separation of concerns setup
  - Every module is contained inside its own folder.
  - root module does not depend on any sub.modules
  - allow multiple teams to work on separate folders
  - run development against processed build src, to memic production environment
  - include express server ready to deploy for production, nodejs handle
    - Minification
    - Concat of vendor and app files
    - Annotation
    - Babel Transform for es6
    - Jasmin Test
    - hot-reloading using socket.io during development
    - Protractor E2E testing
    - Istanbul Coverage reports
    - production ready Express server
    - html5 mode routing enabled
    - Node.Js handle launching server and building app from /src folder with single command
    - Heroku friendly for rapid deployment.
- 1 Factory for data persistence
- 1 data service
- 3 directives for routing
- 1 class for data validation and normalization

## why no webpack/gulp/grunt or any other task manager/build sys ?

- Pre-2015, most apps built using AngularJs 1.X did not have access to such new tooling(s)

- Refactoring of an in-production large scale app to use ES6 of modules can be a challenge;

i chose to get a bit creative with this task, and try to create a custom build system for us!

i crafted an experimental nodejs + socket.io + express server located @ server.js & webtrekk_build.js, that handle all source code minification, concat, Annotation and even included socket.io to add a hotreload :D !

it was fun to build, although took most of the 48hrs that was given for me to complete the task; I think this Idea of a -build sys- deliver a great team development experience :) ! i actually might continue to explore it further after task completion!

## why no modules nor any AMD loaders?

same reason why I used nodes for a build system +

- I wanted to create a build system that would work with john-papa style guide, and back then < 2015 most angularjs style guide did not use AMD loaders
- it's not always possible/feasible to port large scale apps into new modular AMD world, so I wanted to experiment creating a build system that supports those apps and compare the outcome with what I could have saved if I used modern web pack/AMD tools.


## why all modules are extending root angular.module?

`Many Small, Self Contained Modules ` [Y160](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y160) is great; yet for this task, i decided to explore having a single Module that all app sub-modules inherit from;

using glob to scan /src folder and automatically concat all modules into a single file;
i thought it might be a good idea to free root modules from any dependencies; since now all sub-modules call root module and register their own .run and .config blocks etc..

this setup **Pro** was adding a new route is just a matter of creating a new file inside src folder and it will automatically work. no need to hack root module.

yet tbh, by end of this task I can see Cons of this approach;

- that you cannot have your team develop experimental Modules which you exclude from root module dependencies and by that prevent them from loading until u decide to do so.
- testing now easier; you mock load a single module it contains everything, yet in a huge app this can be a huge performance hit that hurt developers experience.

- I think I wouldn't recommend this for any future work [Y160](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y160)is more solid.


## why use directives and not >1.5 angular.component

requirements stated to used bootstrap

angular.component does not support "replace: true" templates, this makes styling components a bit of a challenge unless you decided to us Js-CSS which is not the case here.

- using angular.components would break bootstrap styles, and requires lots of hacking to modify CSS selectors for bootstrap

- there are many existent bugs associated with angular.components and advantage it provides over using angular.directives is not much.


## Getting Started

- `yarn run dev` run karma + development server on localhost:8080
- `yarn run live` build src and run production express server
- `yarn run deploy-setup` setup Heroku
- `yarn run deploy` push local changes to remote Heroku then open new Heroku


## Testing

### unit test using jasmine

tests run against all files ending with .spec.js

karma will load /public/app.js which should contain all your app code; for this reason, you need to have dev server running if you change any code inside /src folder; since dev server will rebuild public/app.js file automatically

- `yarn run test` will run karma only in watch mode; so prefer use `yarn run dev` to run both dev server and karma server.
- all files end with .spec.js

### e2e using protractor

- `yarn run e2e`


with this setup, we can let multiple teams work on multiple sections of the monolithic app, with complete separation they don't even have to be in the same repo.

## in nutshell

all components depend on `src/module.js`  while `src/module.js` depends on only 3rd parties.

`module.js` is the entry file for all components, all components will inherit from it, this is a place to add global configuration; only one person should be responsible for updating this file because it will affect all components.

## Getting started

to run both tests and production server
```shell
yarn dev
```

to run server and hot-reload
```
yarn start
```

to run e2e tests (require protractor)
```
yarn run e2e
```


to run karma-jasmin unit-tests tests (requires karma)
```
yarn run test
```