itunes-node
===========

[![npm](https://img.shields.io/npm/v/itunes-search.svg?style=flat-square)](https://www.npmjs.com/package/itunes-search)
[![npm](https://img.shields.io/npm/dt/itunes-search.svg?style=flat-square)](https://www.npmjs.com/package/itunes-search)
[![Travis Status](https://img.shields.io/travis/Fazendaaa/itunes-node.svg?style=flat-square)](https://travis-ci.org/Fazendaaa/itunes-node)
[![Dependencies](https://david-dm.org/Fazendaaa/itunes-node.svg?style=flat-square)](https://github.com/Fazendaaa/itunes-node/blob/master/package.json)
[![Codecov Status](https://img.shields.io/codecov/c/github/Fazendaaa/itunes-node/badge.svg?style=flat-square)](https://codecov.io/gh/Fazendaaa/itunes-node)
[![Maintainability](https://api.codeclimate.com/v1/badges/04c334bbe522d8a0823f/maintainability)](https://codeclimate.com/github/Fazendaaa/itunes-node/maintainability)

## About

Search against [iTunes](https://www.apple.com/itunes/) using [nodejs](https://nodejs.org/). [TypeScript](https://www.typescriptlang.org/) compatible :3

## Installation

```js
npm install itunes-search --save
```

**note**: no need of installing _@types/itunes-search_ or anything like it since typings are linked in [package.json](./package.json).

## Search

```typescript
import { search } from 'itunes-search';

const options = {
    limit: 50,
    country: 'CA',
    explicit: 'No',
    media: 'movie',
    entity: 'movie',
    attribute: 'movieTerm',
    term: 'field of dreams'
};

search(options)
    .then(console.log)
    .catch(console.error);

const asyncSearchMovie = async (term: string): Promise<void> => {
    const movie = search({
        term,
        country: 'CA',
        media: 'movie'
    });

    console.log(`I found the following movie while searching for \"${term}"\:\n${movie}`);
};

asyncSearchMovie('field of dreams');
```

## Lookup

```typescript
import { lookup } from 'itunes-search';

const options = {
    limit: 25,
    id: 481473944,
    country: 'CA',
    sort: 'recent',
    entity: 'album'
};

lookup(options)
    .then(console.log)
    .catch(console.error);


const asyncLookupAlbum = async (id: number): Promise<void> => {
    const album = lookup({
        id,
        limit: 25,
    	country: 'CA',
        sort: 'recent',
    	entity: 'album'
    });

    console.log(`I found the following album while searching for \"${term}"\:\n${album}`);
};

asyncLookupAlbum(481473944);
```

## Examples
To see it more, just seek other examples in [tests](./tests) folder.

## API

`search`:
* term: The URL-encoded text string you want to search for. For example: _Jack Johnson_.
* country (optional): The [two-letter country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) for the store you want to search. The search uses the default store front for the specified country. For example: _US_. The default is **US**.
* media (optional): The media type you want to search for. For example: _movie_. The default is **all**.
* entity (optional): The type of results you want returned, relative to the specified media type. For example: _movieArtist_ for a movie media type search. The default is the track entity associated with the specified media type.
* attribute (optional): The attribute you want to search for in the stores, relative to the specified media type.
* limit (optional): The number of search results you want the iTunes Store to return. For example: _25_.The default is **50**.
* lang (optional): The language, English or Japanese, you want to use when returning search results. Specify the language using the five-letter codename. For example: en_us.The default is en_us (**English**).
* version (optional): The search result key version you want to receive back from your search. The default is **2**.
* explicit (optional): A flag indicating whether or not you want to include explicit content in your search results. The default is **Yes**.

`lookup`:
* id (optional): iTunes id.
* upc (optional): [Universal Product Code](https://en.wikipedia.org/wiki/Universal_Product_Code).
* isbn (optional): [International Standard Book Number](https://en.wikipedia.org/wiki/International_Standard_Book_Number).
* limit (optional): The number of search results you want the iTunes Store to return. For example: _25_.The default is **50**.
* entity (optional): The type of results you want returned, relative to the specified media type. For example: _movieArtist_ for a movie media type search. The default is the track entity associated with the specified media type.
* amgVideoId (optional): [AllMusic](https://en.wikipedia.org/wiki/AllMusic) is previously known as All Music Guide or AMG.
* amgAlbumId (optional): [AllMusic](https://en.wikipedia.org/wiki/AllMusic) is previously known as All Music Guide or AMG.
* amgArtistId (optional): [AllMusic](https://en.wikipedia.org/wiki/AllMusic) is previously known as All Music Guide or AMG.

**note**: all fields are optional bu at least one must be provided.

### Types

| media | entity | attribute |
| ----- | ------ | --------- |
| movie | movieArtist, movie | actorTerm, genreIndex, artistTerm, shortFilmTerm, producerTerm, ratingTerm, directorTerm, releaseYearTerm, featureFilmTerm, movieArtistTerm, movieTerm, ratingIndex, descriptionTerm |
| podcast | podcastAuthor, podcast | titleTerm, languageTerm, authorTerm, genreIndex, artistTerm, ratingIndex, keywordsTerm, descriptionTerm |
| music | musicArtist, musicTrack, album, musicVideo, mix, song | mixTerm, genreIndex, artistTerm, composerTerm, albumTerm, ratingIndex, songTerm |
| musicVideo | musicArtist, musicVideo | genreIndex, artistTerm, albumTerm, ratingIndex, songTerm |
| audiobook | audiobookAuthor, audiobook | titleTerm, authorTerm, genreIndex, ratingIndex |
| shortFilm | shortFilmArtist, shortFilm | genreIndex, artistTerm, shortFilmTerm, ratingIndex, descriptionTerm |
| tvShow | tvEpisode, tvSeason | genreIndex, tvEpisodeTerm, showTerm, tvSeasonTerm, ratingIndex, descriptionTerm |
| software | software, iPadSoftware, macSoftware | softwareDeveloper |
| ebook | ebook |
| all | movie, album, allArtist, podcast, musicVideo, mix, audiobook, tvSeason, allTrack | actorTerm, languageTerm, allArtistTerm, tvEpisodeTerm, shortFilmTerm, directorTerm, releaseYearTerm, titleTerm, featureFilmTerm, ratingIndex, keywordsTerm, descriptionTerm, authorTerm, genreIndex, mixTerm, allTrackTerm, artistTerm, composerTerm, tvSeasonTerm, producerTerm, ratingTerm, songTerm, movieArtistTerm, showTerm, movieTerm, albumTerm |

**note**: Please note that **musicTrack** can include both songs and music videos in the results

To see more, just read the [iTunes Docs](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/).
