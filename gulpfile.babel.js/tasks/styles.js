import gulp from 'gulp';
import gulpIf from 'gulp-if';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import sassGlob from 'gulp-sass-glob';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import discardComments from 'postcss-discard-comments';
import postcssImport from 'postcss-import';
import { IS_DEBUG, CSS_ENTRY, CSS_OUTPUT } from './config';

const plugins = [
  autoprefixer(),
  discardComments(),
  postcssImport(),
];

export default () => gulp.src(CSS_ENTRY)
  .pipe(gulpIf(IS_DEBUG, sourcemaps.init()))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(plugins))
  .pipe(cssnano({
    zIndex: false,
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulpIf(IS_DEBUG, sourcemaps.write('./')))
  .pipe(gulp.dest(CSS_OUTPUT));
