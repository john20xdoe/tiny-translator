# TinyTranslator with Angular 6 and 7

> A tiny little webapp to quick and dirty translate XLIFF 2.0, XLIFF 1.2 or xmb/xtb files before Angular CLI officially supports built-in translations.

## Published at:

- [Tiny Translator (English)](https://john20xdoe.github.io/tiny-translator/en)
- [Tiny Translator (Deutsch)](https://john20xdoe.github.io/tiny-translator/de)
- [Tiny Translator (Google traduit Français)](https://john20xdoe.github.io/tiny-translator/fr-google)
- [Tiny Translator (Русский Google переведен)](https://john20xdoe.github.io/tiny-translator/ru-google)

The French and Russian instances may be incomplete as I do not have a paid Google Translate API key.

<hr />

## Local Development

Latest version now uses Angular 7 CLI. You can still onload .xlf files from Angular 6 and below into the running app.

```bash
$ npm install
$ npm run start-en
```

Go to [localhost:4200](http://localhost:4200)

## Extract Translations Strings

```bash
$ npm run extract
```

## Publish to Github Pages

```bash
$ npm run publish:ghpages
```

<hr />

## Credits

- This is forked from [martinroob/tiny-translator](https://github.com/martinroob/tiny-translator).

  - **Notes from original repo/author:**
    This project has moved to the monorepo [ngx-i18nsupport](https://github.com/martinroob/ngx-i18nsupport).

    Here can find the actual [Tiny-Translator README](https://github.com/martinroob/ngx-i18nsupport/tree/master/projects/tiny-translator/README.md).

    The ready to use application can be found on the following GitHubPages:

    - [Tiny Translator (English)](https://martinroob.github.io/tiny-translator/en)
    - [Tiny Translator (Deutsch)](https://martinroob.github.io/tiny-translator/de)
    - [Tiny Translator (Google traduit Français)](https://martinroob.github.io/tiny-translator/fr-google)
    - [Tiny Translator (Русский Google переведен)](https://martinroob.github.io/tiny-translator/ru-google)

    Bugs can be reported using the [issue tracker of this repo](https://github.com/martinroob/tiny-translator/issues) or using the [issue tracker of the new monorepo](https://github.com/martinroob/ngx-i18nsupport/issues).

- For extracting and generating xlf files, I had revised npm scripts made by martinroob into new ones that use [ngx-translate/i18n-polyfill](https://github.com/ngx-translate/i18n-polyfill).
  - NOTE: this is just used for translating **tiny-translator** itself, NOT for what it does (.xlf load, parse, export, etc).
  - This setup (I mean the `npm run extract` scripts and `angular.json`) can be imitated for other Angular 6/7 projects that require i18n. Please follow the i18n-polyfill docs for a full explanation.
