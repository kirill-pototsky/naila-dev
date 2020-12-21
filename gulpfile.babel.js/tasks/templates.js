import gulp from 'gulp';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import log from 'fancy-log';
import prettify from 'gulp-jsbeautifier';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import { HTML_ENTRY, HTML_OUTPUT } from './config';

const getData = require('jade-get-data')('app/data');

export default () => (
  gulp.src(HTML_ENTRY)
    .pipe(plumber({
      errorHandler(err) {
        log('Error in "templates" task');
        log.error(err.message);
      },
    }))
    .pipe(filter(file => /app[\\\/]pages/.test(file.path))) // eslint-disable-line no-useless-escape
    .pipe(pug({
      doctype: 'html',
      data: {
        getData,
      },
    }))
    .pipe(prettify({
      brace_style: 'expand',
      indent_with_tabs: true,
      indent_inner_html: true,
      preserve_newlines: true,
      end_with_newline: true,
      wrap_line_length: 0,
      max_preserve_newlines: 50,
      wrap_attributes_indent_size: 1,
      inline: [/* 'span', */'img', 'use'], // uncomment span if needed
      extra_liners: ['script'],
    }))
    .pipe(rename({ dirname: '.' }))
    .pipe(gulp.dest(HTML_OUTPUT))
);
