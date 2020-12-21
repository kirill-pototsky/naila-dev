import del from 'del';
import { HTML_SKIP_COMPILATION, HTML_OUTPUT } from './config';

export default (done) => {
  if (HTML_SKIP_COMPILATION) {
    done();
    return false;
  }

  return del(HTML_OUTPUT);
};
