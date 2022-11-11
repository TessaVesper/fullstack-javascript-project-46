import fs from 'fs';
import path from 'path';

export const genDiff = (filepath1, filepath2) => {
    const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
    const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
    const comparedResult = compare(obj1, obj2);
    const str = stringifyAndSort(comparedResult);
    console.log(str);
  }