const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const withSass = require('@zeit/next-sass');


module.exports = withSass({
  target: 'serverless',
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    config.resolve.alias.components = path.join(__dirname, 'components');
    config.resolve.alias.data = path.join(__dirname, 'src/data');
    config.resolve.alias.scss = path.join(__dirname, 'scss');
    config.resolve.alias.contexts = path.join(__dirname, 'contexts');

    return config
  }
})