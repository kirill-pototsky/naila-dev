import gulp from 'gulp';
import changed from 'gulp-changed';
import { STATIC_ENTRY, STATIC_OUTPUT } from './config';

export default () => gulp.src(STATIC_ENTRY, {
  since: gulp.lastRun('copy'),
})
  .pipe(changed(STATIC_OUTPUT))
  .pipe(gulp.dest(STATIC_OUTPUT));
