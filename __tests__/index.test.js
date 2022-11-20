import genDiff from '../src/index.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const expected = readFile('result_json.txt').trim();

test('test plain json files', () => {
    expect(actual).toEqual(expected);
});