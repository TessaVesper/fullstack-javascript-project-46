import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const getFilePath = (filepath) => {
  const filePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(filePath, 'utf-8');
}

const compareFiles = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);
  const uniqueKeys = _.uniq(keys)
  const sortedKeys = _.sortBy(uniqueKeys);

  const result = sortedKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (!keys1.includes(key)) {
      return {
        type: 'added',
        key,
        value: value2,
      };
    }
    if (!keys2.includes(key)) {
      return {
        type: 'deleted',
        key,
        value: value1,
      };
    }
    if (value1 !== value2) {
      return {
        type: 'diffValue',
        key,
        value1,
        value2,
      };
    }
  return {
    type: 'same',
    key,
    value: value1,
  };
});
  return result;
};

const stringify = (obj) => {
  const result = obj.map((el) => {
    const typeObj = el.type;
    switch (typeObj) {
      case 'deleted':
        return `- ${el.key}: ${el.value}`;
      case 'same':
        return `  ${el.key}: ${el.value}`;
      case 'diffValue':
        return `- ${el.key}: ${el.value1}\n+ ${el.key}: ${el.value2}`;
      case 'added':
        return `+ ${el.key}: ${el.value}`;
      default:
        return null;
    }
  });
  return `{\n${result.join('\n')}\n}`;
};


export const genDiff = (filepath1, filepath2) => {
    const obj1 = JSON.parse(getFilePath(filepath1));
    const obj2 = JSON.parse(getFilePath(filepath2));
    const compared = stringify(compareFiles(obj1, obj2))
    console.log(compared);
  };
