import { IncomingMessage } from 'http';
import { get } from 'https';

interface IMakeRequest {
    readonly kind: string;
    readonly options: iTunesSearch | iTunesLookup;
}

interface IGenerateUrl extends IMakeRequest { }

interface HandleRequest {
    readonly response: IncomingMessage;
    readonly reject: (data: Error) => void;
    readonly resolve: (data: iTunesResponse) => void;
}

export type Media = 'all' |
                    'ebook' |
                    'movie' |
                    'music' |
                    'tvShow' |
                    'podcast' |
                    'software' |
                    'audioBook' |
                    'shortFilm' |
                    'musicVideo';

export type Entity = 'mix' |
                     'song' |
                     'movie' |
                     'ebook' |
                     'album' |
                     'podcast' |
                     'allTrack' |
                     'tvSeason' |
                     'software' |
                     'allArtist' |
                     'audiobook' |
                     'shortFilm' |
                     'tvEpisode' |
                     'musicVideo' |
                     'musicTrack' |
                     'musicArtist' |
                     'macSoftware' |
                     'movieArtist' |
                     'iPadSoftware' |
                     'podcastAuthor' |
                     'audiobookAuthor' |
                     'shortFilmArtist';

export type Attribute = 'mixTerm' |
                        'showTerm' |
                        'albumTerm' |
                        'actorTerm' |
                        'titleTerm' |
                        'movieTerm' |
                        'genreIndex' |
                        'artistTerm' |
                        'authorTerm' |
                        'ratingTerm' |
                        'ratingIndex' |
                        'allTrackTerm' |
                        'tvSeasonTerm' |
                        'composerTerm' |
                        'producerTerm' |
                        'directorTerm' |
                        'languageTerm' |
                        'keywordsTerm' |
                        'allArtistTerm' |
                        'tvEpisodeTerm' |
                        'shortFilmTerm' |
                        'movieArtistTerm' |
                        'releaseYearTerm' |
                        'featureFilmTerm' |
                        'descriptionTerm' |
                        'softwareDeveloper';

export type Explicit = 'No' | 'Yes';

export interface iTunesSearch {
    readonly term: string;
    readonly media?: Media;
    readonly lang?: string;
    readonly limit?: number;
    readonly country: string;
    readonly entity?: Entity;
    readonly version?: number;
    readonly explicit?: Explicit;
    readonly attribute?: Attribute;
}

export interface iTunesLookup {
    readonly id?: number;
    readonly upc?: number;
    readonly isbn?: number;
    readonly limit?: number;
    readonly entity?: Entity;
    readonly amgVideoId?: number;
    readonly amgAlbumId?: number;
    readonly amgArtistId?: number;
}

export interface iTunesData {
    readonly kind: string;
    readonly viewUrl: string;
    readonly trackName: string;
    readonly artistName: string;
    readonly wrapperType: string;
    readonly previewUrl?: string;
    readonly explicitness: string;
    readonly censoredName: string;
    readonly artworkUrl60?: string;
    readonly collectionName: string;
    readonly artworkUrl100?: string;
    readonly trackTimeMillis?: number;
}

export interface iTunesResponse {
    readonly resultCount: number;
    readonly result: iTunesData[];
}

const setDefaultOptions = (options: iTunesSearch | iTunesLookup): iTunesSearch | iTunesLookup => {
    const defaultOptions = <iTunesSearch> {
        term: '',
        country: 'US',
        callback: null
    };

    return { ...defaultOptions, ...options };
};

const generateURL = ({ kind, options }: IGenerateUrl): string => {
    const requestOptions = setDefaultOptions(options);
    const optionsString = Object.keys(requestOptions).map((value: string) => {
        const property = <keyof (iTunesSearch | iTunesLookup)> value;

        return `${value}=${encodeURIComponent(<string> requestOptions[property])}`;
    });
    const parsedOptions = optionsString.join('&').replace(/%20/g, '+');

    return `https://itunes.apple.com/${kind}?${parsedOptions}`;
};

const removeCallback = (input: string): string => {
    const first = input.replace('null(', '');

    return first.replace(');', '');
};

const handleRequest = ({ response, reject, resolve }: HandleRequest): void => {
    let chunk = '';
    const { statusCode } = response;

    if (200 !== statusCode) {
        reject(new Error('Bad response from iTunes server'));
    }

    response
        .setEncoding('utf8')
        .on('error', reject)
        .on('uncaughtException', reject)
        .on('data', (data: string) => chunk += data)
        .on('end', () => {
            resolve(JSON.parse(removeCallback(chunk)));
        });
};

const makeRequest = async ({ kind, options }: IMakeRequest): Promise<iTunesResponse> => {
    return new Promise((resolve: (data: iTunesResponse) => void, reject: (data: Error) => void) => {
        get(generateURL({ kind, options }))
            .on('response', ((response: IncomingMessage) => {
                handleRequest({ resolve, reject, response });
            }))
            .on('error', reject)
            .end();
    });
};

/**
 * This function searches the iTunes API for the required content.
 *
 * @param options iTunes options to search for.
 * @returns Promise iTunesResponse object.
 */
export const search = async (options: iTunesSearch): Promise<iTunesResponse> => makeRequest({ kind: 'search', options });

/**
 * This function looks up the iTunes API for the required content.
 *
 * @param options iTunes options to lookup for.
 * @returns Promise iTunesResponse object.
 */
export const lookup = async (options: iTunesLookup): Promise<iTunesResponse> => makeRequest({ kind: 'lookup', options });
