import { join } from 'path';

module.exports = {
    target: 'node',
    mode: 'development',
    entry: join(__dirname, './src/itunes-search.ts'),
    node: {
        __dirname: false
    },
    output: {
        filename: 'itunes-search.js',
        path: join(__dirname, 'dist')
    },
    resolve: {
        alias: {
            'itunes-search': join(__dirname, './src/itunes-search.ts')
        },
        extensions: [
            '.js',
            '.ts',
            '.tsx'
        ]
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [
                    /node_modules/,
                    /tests/
                ]
            }
        ]
    }
};
