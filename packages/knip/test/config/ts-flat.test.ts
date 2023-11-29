import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve } from '../../src/util/path.js';
import { execFactory } from '../helpers/exec.js';

const cwd = resolve('fixtures/config/ts-flat');

const exec = execFactory(cwd);

test('Support loading ts object files for configuration', async () => {
  assert.equal(exec('knip').stdout, '');
});
