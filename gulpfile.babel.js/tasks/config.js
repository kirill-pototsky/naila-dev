import dotenv from 'dotenv';

const dotenvObj = dotenv.config();

if (dotenvObj.error) {
  throw new Error('Please create .env file');
}

export const IS_DEBUG = process.env.NODE_ENV === 'development';

export const {
  HTML_ENTRY,
  HTML_OUTPUT,
  HTML_SKIP_COMPILATION,
  CSS_ENTRY,
  CSS_OUTPUT,
  JS_ENTRY,
  JS_OUTPUT,
  IMG_ENTRY,
  IMG_OUTPUT,
  SVG_ENTRY,
  SVG_OUTPUT,
  STATIC_ENTRY,
  STATIC_OUTPUT,
} = dotenvObj.parsed;
