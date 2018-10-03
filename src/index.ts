import { IncomingMessage } from 'http';
import { get } from 'https';

interface IMakeRequest {
    readonly kind: string;
    readonly options: iTunesSearch | iTunesLookup;
}

interface IGenerateUrl extends IMakeRequest { }

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

export type Explicit = 'No' | 'Yes';

export interface iTunesSearch {
    readonly term: string;
    readonly media?: Media;
    readonly lang?: string;
    readonly limit?: number;
    readonly country: string;
    readonly entity?: string;
    readonly version?: number;
    readonly attribute?: string;
    readonly explicit?: Explicit;
}

export interface iTunesLookup {
    readonly id?: number;
    readonly upc?: number;
    readonly isbn?: number;
    readonly limit?: number;
    readonly entity?: string;
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

const handleRequest = (resolve: (data: iTunesResponse) => void, reject: (data: Error) => void, response: IncomingMessage): void => {
    let chunk = '';
    const { statusCode } = response;

    if (200 !== statusCode) {
        reject(new Error('Bad response from iTunes server'));
    }

    response.setEncoding('utf8')
            .on('error', reject)
            .on('uncaughtException', reject)
            .on('data', (data: string) => chunk += data)
            .on('end', () => resolve(JSON.parse(removeCallback(chunk))));
};

const makeRequest = async ({ kind, options }: IMakeRequest): Promise<iTunesResponse> => {
    return new Promise((resolve: (data: iTunesResponse) => void, reject: (data: Error) => void) => {
        const request = get(generateURL({ kind, options }));
        const curriedHandleRequest = ((response: IncomingMessage) => handleRequest(resolve, reject, response));

        request.on('error', () => reject(new Error('Request error')));
        request.on('response', curriedHandleRequest);
        request.end();
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
