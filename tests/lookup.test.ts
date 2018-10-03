import { iTunesLookup, lookup } from '../src';

jest.setTimeout(10000);

describe('Testing lookup', () => {
    test('Documentation example', async () => {
        const options = <iTunesLookup> {
            limit: 1,
            id: 481473944,
            entity: 'album'
        };
        const output = {
            resultCount: 2,
            results:
                [{
                    wrapperType: 'artist',
                    artistType: 'Artist',
                    artistName: 'Giraffage',
                    artistLinkUrl: 'https://itunes.apple.com/us/artist/giraffage/481473944?uo=4',
                    artistId: 481473944,
                    amgArtistId: 2620135,
                    primaryGenreName: 'Electronic',
                    primaryGenreId: 7
                },
                {
                    wrapperType: 'collection',
                    collectionType: 'Album',
                    artistId: '481473944',
                    collectionId: 481473943,
                    amgArtistId: 2620135,
                    artistName: 'Giraffage',
                    collectionName: 'Comfort',
                    collectionCensoredName: 'Comfort',
                    artistViewUrl: 'https://itunes.apple.com/us/artist/giraffage/481473944?uo=4',
                    collectionViewUrl: 'https://itunes.apple.com/us/album/comfort/481473943?uo=4',
                    // tslint:disable
                    artworkUrl60: 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/68/0b/ad/680bad5d-e524-7029-c78e-be177c313ed3/source/60x60bb.jpg',
                    artworkUrl100: 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/68/0b/ad/680bad5d-e524-7029-c78e-be177c313ed3/source/100x100bb.jpg',
                    //  tslint:enable
                    collectionPrice: 9.99,
                    collectionExplicitness: 'notExplicit',
                    trackCount: 11,
                    copyright: '℗ 2011 Giraffage',
                    country: 'USA',
                    currency: 'USD',
                    releaseDate: '2011-11-17T08:00:00Z',
                    primaryGenreName: 'Electronic'
                }]
        };

        return expect(lookup(options)).resolves.toEqual(output);
    });
});
