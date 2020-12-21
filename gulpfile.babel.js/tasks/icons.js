import gulp from 'gulp';
import plumber from 'gulp-plumber';
import log from 'fancy-log';
import rename from 'gulp-rename';
import svgSymbols from 'gulp-svg-symbols';
import svgmin from 'gulp-svgmin';
import { SVG_ENTRY, SVG_OUTPUT } from './config';

export default () => gulp.src(SVG_ENTRY)
  .pipe(plumber({
    errorHandler(err) {
      log('Error in "icons" task');
      log.error(err.message);
    },
  }))
  .pipe(svgSymbols({
    title: false,
    id: 'icon_%f',
    templates: ['default-svg'],
  }))
  .pipe(svgmin({
    plugins: [
      {
        removeViewBox: false,
      }, {
        removeUselessStrokeAndFill: true,
      }, {
        cleanupIDs: false,
      }, {
        cleanupAttrs: true,
      }, {
        removeMetadata: true,
      }, {
        removeTitle: true,
      }, {
        removeAttrs: {
          attrs: '(fill|stroke|data-name)',
        },
      },
    ],
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest(SVG_OUTPUT));
