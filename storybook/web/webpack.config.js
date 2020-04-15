/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
            presets: [['react-app', { flow: false, typescript: true }]],
        },
    })
    config.resolve.extensions.push('.ts', '.tsx')

    config.resolve.alias['react-native$'] = 'react-native-web'
    config.output['chunkFilename'] = '[name].chunk.js'

    return config
}
