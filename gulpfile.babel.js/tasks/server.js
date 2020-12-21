import browserSync from 'browser-sync';

export default () => {
  browserSync.init({
    open: true,
    reloadOnRestart: true,
    reloadDebounce: 100,
    port: 3000,
    snippetOptions: {
      rules: {
        match: /<\/body>/i,
      },
    },
    server: {
      baseDir: [
        './dist',
      ],
    },
    directory: false,
    notify: false,
  });

  browserSync.watch('dist/assets/').on('change', browserSync.reload);
};

export function browserReload(done) {
  browserSync.reload();
  done();
}
