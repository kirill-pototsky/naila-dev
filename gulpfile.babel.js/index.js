import gulp from 'gulp';
import clean from './tasks/clean';
import copy from './tasks/copy';
import images from './tasks/images';
import icons from './tasks/icons';
import scripts from './tasks/scripts';
import server, { browserReload } from './tasks/server';
import templates from './tasks/templates';
import watch from './tasks/watch';
import styles from './tasks/styles';

gulp.task('clean', clean);
gulp.task('copy', copy);
gulp.task('images', images);
gulp.task('icons', icons);
gulp.task('scripts', scripts);
gulp.task('server', server);
gulp.task('templates', templates);
gulp.task('reload', browserReload);
gulp.task('templates:watch', gulp.series('templates', 'reload'));
gulp.task('watch', watch);
gulp.task('styles', styles);

gulp.task('build',
  gulp.series('clean',
    gulp.parallel('styles', 'scripts', 'images', 'icons', 'templates', 'copy')));

gulp.task('default',
  gulp.series('build',
    gulp.parallel('watch', 'server')));
