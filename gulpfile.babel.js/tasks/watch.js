import gulp from 'gulp';
import { SVG_ENTRY, IMG_ENTRY, STATIC_ENTRY } from './config';

export default () => {
  gulp.watch(SVG_ENTRY, gulp.series('icons'));
  gulp.watch(IMG_ENTRY, gulp.series('images'));
  gulp.watch(STATIC_ENTRY, gulp.series('copy'));
  gulp.watch('app/{pages,blocks,components,layouts}/**/*.pug', gulp.series('templates:watch'));
  gulp.watch('app/{styles,blocks,components,pages}/**/*.scss', gulp.series('styles'));
  gulp.watch('app/data/**/*.json', gulp.series('templates:watch'));
};
