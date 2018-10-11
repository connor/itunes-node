import { iTunesSearch, search } from 'itunes-search';

jest.setTimeout(10000);

describe('Testing search', () => {
    test('Documentation example', async () => {
        const options = <iTunesSearch> {
            limit: 50,
            country: 'CA',
            explicit: 'No',
            media: 'movie',
            entity: 'movie',
            attribute: 'movieTerm',
            term: 'field of dreams'
        };
        const output = {
            resultCount: 1,
            results: [
                {
                    artistName: 'Phil Alden Robinson',
                    // tslint:disable
                    artworkUrl100: 'https://is2-ssl.mzstatic.com/image/thumb/Video/v4/67/7c/cf/677ccff2-c634-b4a7-1c3b-9985e0686f81/source/100x100bb.jpg',
                    artworkUrl30: 'https://is2-ssl.mzstatic.com/image/thumb/Video/v4/67/7c/cf/677ccff2-c634-b4a7-1c3b-9985e0686f81/source/30x30bb.jpg',
                    artworkUrl60: 'https://is2-ssl.mzstatic.com/image/thumb/Video/v4/67/7c/cf/677ccff2-c634-b4a7-1c3b-9985e0686f81/source/60x60bb.jpg',
                    collectionExplicitness: 'notExplicit',
                    collectionHdPrice: 14.99,
                    collectionPrice: 9.99,
                    contentAdvisoryRating: 'PG',
                    country: 'CAN',
                    currency: 'CAD',
                    kind: 'feature-movie',
                    longDescription: '\"If you build it, he will come.\" With these words, Iowa farmer Ray Kinsella (Kevin Costner) is inspired by a voice he can\'t ignore to pursue a dream he can hardly believe. Also starring Ray Liotta, James Earl Jones, and Amy Madigan, Field of Dreams is an extraordinary and unforgettable experience that has moved critics and audiences like no other film of its generation. Field of Dreams is a glowing tribute to all who dare to dream.',
                    previewUrl: 'https://video-ssl.itunes.apple.com/apple-assets-us-std-000001/Video118/v4/40/1a/8a/401a8a76-e7f1-5127-06bf-4ba243e9171a/mzvf_7952018799658673202.640x352.h264lc.U.p.m4v',
                    //  tslint:enable
                    primaryGenreName: 'Drama',
                    releaseDate: '1989-04-21T07:00:00Z',
                    trackCensoredName: 'Field of Dreams',
                    trackExplicitness: 'notExplicit',
                    trackHdPrice: 14.99,
                    trackHdRentalPrice: 4.99,
                    trackId: 279990601,
                    trackName: 'Field of Dreams',
                    trackPrice: 9.99,
                    trackRentalPrice: 4.99,
                    trackTimeMillis: 6329620,
                    trackViewUrl: 'https://itunes.apple.com/ca/movie/field-of-dreams/id279990601?uo=4',
                    wrapperType: 'track'
                }
            ]
        };

        return expect(search(options)).resolves.toEqual(output);
    });
});
