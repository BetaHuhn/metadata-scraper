# Contributing

Thanks for taking the time to contribute to this project!

## How to help?

There are multiple tasks you can do in order to help us, for example:
- fill an issue to report bugs or your specific needs
- contribute to existing issue
- write a PR to improve the project

## Repository structure

All the important files are in the src directory.

## Contributing workflow

In order to make a code contribution, create a fork of Ackee by clicking the "Fork" button on [GitHub](https://github.com/BetaHuhn/metadata-scraper) and cloning the repo to your local machine.

Please use the `develop` branch as a base for your contribution and make your changes on a new branch.

Ensure that you open an issue to discuss the changes before submitting a PR.

Once you're finished, push your branch to your repo and create a pull request!

## Commands
### Linting

[ESlint](https://eslint.org/) is used for linting. It's recommended to add the corresponding extension to your editor. It's also possible to run the `lint` task with the following command:

```shell
$ npm run lint
```

### Development

During development it is helpful to watch for file changes and automatically rebuild the files: 

```shell
$ npm run watch
```

### Build

To produce a production build, run:

```shell
$ npm run build
```
