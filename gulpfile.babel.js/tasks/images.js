import gulp from 'gulp';
import plumber from 'gulp-plumber';
import log from 'fancy-log';
import changed from 'gulp-changed';
import { IMG_ENTRY, IMG_OUTPUT } from './config';

export default () => gulp.src(IMG_ENTRY)
  .pipe(plumber({
    errorHandler(err) {
      log('Error in "images" task');
      log.error(err.message);
    },
  }))
  .pipe(changed(IMG_OUTPUT))
  .pipe(gulp.dest(IMG_OUTPUT));
