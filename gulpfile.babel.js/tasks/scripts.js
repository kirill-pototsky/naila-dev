import webpack from 'webpack';
import log from 'fancy-log';
import statsLogger from 'webpack-stats-logger';
import webpackConfig from '../../webpack.config.babel';

export default done => webpack(webpackConfig, (error, stats) => {
  const errorList = stats.toJson().errors;
  if (errorList.length) {
    errorList.forEach((message) => {
      log('Error in "scripts" task');
      log.error(message);
    });
  }
  statsLogger(error, stats);
  done();
});
