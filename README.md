itunes-node
===========

[![npm](https://img.shields.io/npm/dt/itunes-search.svg?style=flat-square)](https://www.npmjs.com/package/itunes-search)
![Travis (.org)](https://img.shields.io/travis/:user/:repo.svg?style=flat-square)

## About

Search against [iTunes](https://www.apple.com/itunes/) using [nodejs](https://nodejs.org/).

[TypeScript](https://www.typescriptlang.org/) compatible :3

## Installation

```js
npm install itunes-search
```

## Search

[API Search reference](http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searching)

```ts
import { search } from 'itunes-search';

const options = {
	term: 'field of dreams',
	media: 'movie', // options are: podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook, all
	entity: 'movie',
	attribute: 'movieTerm',
	limit: 50,
	explicit: 'No', // explicit material
	country: 'CA' // default US
};

search(options).then(console.log).catch(console.error);
```

## Lookup

[API Lookup reference](http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#lookup)

```ts
import { lookup } from 'itunes-search';

const options = {
   id: 481473944,
   entity: "album",
   limit: 25,
   sort: "recent",
   country: "CA" // default US
};

lookup(options).then(console.log).catch(console.error);
```

# Examples

To see it more, just seek other examples in [tests](./tests) folder.
