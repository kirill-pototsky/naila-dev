import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import slider from '../blocks/slider/slider';
import tabs from '../blocks/tabs/tabs';
import header from './common/header';
import burger from './common/burger';
import modal from './common/modal';
import form from './common/form';
import grosh from './common/grosh';

$(() => {
  svg4everybody();
  objectFitImages();
  slider();
  tabs();
  header();
  burger();
  modal();
  form();
  grosh();
});
