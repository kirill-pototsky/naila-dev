/* eslint-disable */
const fs = require('fs');
const path = require('path');
const program = require('commander');

const block = blockName => `
mixin ${blockName}()
  +b.${blockName}&attributes(attributes)
    block
`;

const component = blockName => `
mixin ${blockName}()
  +b.${blockName}&attributes(attributes)
    block
`;

const page = pageName => `
extends ../../layouts/default

block head
  - var pageTitle = 'Frontend Template';

block content
  +b.${pageName}
`;

const scss = blockName => `
.${blockName} {

}
`;

const js = `
import $ from 'jquery';

export default () => {

};
`;

const sources = {
  block,
  component,
  page,
  scss,
  js,
};

const dirPath = {
  block: path.resolve('app/blocks'),
  page: path.resolve('app/pages'),
  component: path.resolve('app/components'),
};

const validateName = (name, kind) => (
  new Promise((resolve, reject) => {
    const isValid = /^(\d|\w|-)+$/.test(name);

    if (isValid) {
      resolve(isValid);
    } else {
      const errMsg = (
        `ERR>>> An incorrect ${kind} name '${name}'\n`
        + 'ERR>>> A block name must include letters, numbers & the minus symbol.'
      );
      reject(errMsg);
    }
  })
);

const createDir = blockPath => (
  new Promise((resolve, reject) => {
    fs.mkdir(blockPath, (err) => {
      if (err) {
        reject(new Error(`ERR>>> Failed to create a folder '${dirPath}'`));
      } else {
        resolve();
      }
    });
  })
);

const directoryExist = (blockPath, name, kind) => (
  new Promise((resolve, reject) => {
    fs.stat(blockPath, (notExist) => {
      if (notExist) {
        resolve();
      } else {
        console.log(blockPath);
        reject(new Error(`ERR>>> The ${kind} '${name}' already exists.`));
      }
    });
  })
);

const generateFileSources = (name, kind, isJs) => {
  const data = {};
  data.pug = sources[kind](name).trim();
  data.scss = sources.scss(name).trim();

  if (isJs) {
    data.js = sources.js.trim();
  }

  return Promise.resolve(data);
};

const createFiles = (blockPath, name, files) => (
  Object.keys(files).map((ext) => {
    const filePath = path.join(blockPath, `${name}.${ext}`);
    const fileSource = files[ext];

    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, fileSource, 'utf8', (err) => {
        if (err) {
          reject(new Error(`ERR>>> Failed to create a file '${filePath}'`));
        } else {
          resolve();
        }
      });
    });
  })
);

const getFiles = blockPath => (
  new Promise((resolve, reject) => {
    fs.readdir(blockPath, (err, files) => {
      if (err) {
        reject(new Error(`ERR>>> Failed to get a file list from a folder '${blockPath}'`));
      } else {
        resolve(files);
      }
    });
  })
);

const appendToIncludes = (kind, blockName) => {
  const filePath = './app/layouts/_internalIncludes.pug';

  if (['component', 'block'].indexOf(kind) === -1) {
    return;
  }

  const file = fs.readFileSync(filePath, 'utf8');
  const includeString = `include ../${kind}s/${blockName}/${blockName}`;
  const lines = file.split(/\n/).filter(line => !!line);

  if (lines.indexOf(includeString) !== -1) {
    console.log(`>>> ${kind} ${blockName} already included to '${filePath}'`);
    return;
  }

  lines.push(includeString);
  const nextFile = lines.sort().join('\n');
  fs.writeFileSync(filePath, nextFile, 'utf8');
};

const make = (name, kind, isJs) => {
  const blockPath = path.join(dirPath[kind], name);

  return validateName(name, kind)
    .then(() => directoryExist(blockPath, name, kind))
    .then(() => createDir(blockPath))
    .then(() => generateFileSources(name, kind, isJs))
    .then(files => createFiles(blockPath, name, files))
    .then(() => getFiles(blockPath))
    .then((files) => {
      const line = '-'.repeat(48 + name.length);
      console.log(line);
      console.log(`The block has just been created in 'app/${kind}s/${name}'`);
      console.log(line);
    })
    .then(() => ({ kind, name }));
};

const printError = err => console.log(err);

program
  .command('block [blockNames...]')
  .option('--js', 'Generate script file')
  .action(async (blockNames, opts) => {
    if (blockNames === undefined) {
      return console.log('Please enter blockName');
    }

    const promises = blockNames.map(name => make(name, 'block', opts.js));

    const blocks = await Promise.all(promises).catch(printError);
    blocks.forEach(item => appendToIncludes(item.kind, item.name));
  });

program
  .command('component [componentNames...]')
  .option('--js', 'Generate script file')
  .action(async (componentNames, opts) => {
    if (componentNames === undefined) {
      return console.log('Please enter componentName');
    }

    const promises = componentNames.map(name => make(name, 'component', opts.js));
    Promise.all(promises).catch(printError);

    const blocks = await Promise.all(promises).catch(printError);
    blocks.forEach(item => appendToIncludes(item.kind, item.name));
  });

program
  .command('page [pageNames...]')
  .option('--js', 'Generate script file')
  .action(async (pageNames, opts) => {
    if (pageNames === undefined) {
      return console.log('Please enter pageName');
    }

    const promises = pageNames.map(name => make(name, 'page', opts.js));
    Promise.all(promises).catch(printError);
  });

program.parse(process.argv);
