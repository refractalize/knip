import fs from 'node:fs/promises';
import path from 'node:path';
// eslint-disable-next-line import/order -- Modules in @types are handled differently
import { load as esmLoad } from '@esbuild-kit/esm-loader';
import yaml from 'js-yaml';
import { require } from '../util/require.js';
import { LoaderError } from './errors.js';
import { loadJSON } from './fs.js';
import { timerify } from './performance.js';

const load = async (filePath: string) => {
  try {
    if (/\.jsonc?$/.test(filePath) || /rc$/.test(filePath)) {
      return loadJSON(filePath);
    }

    if (path.extname(filePath) === '.yaml' || path.extname(filePath) === '.yml') {
      return yaml.load((await fs.readFile(filePath)).toString());
    }

    const imported = await esmLoad(filePath, {}, require);
    return imported.default ?? imported;
  } catch (error) {
    throw new LoaderError(`Error loading ${filePath}`, { cause: error });
  }
};

export const _load = timerify(load);
