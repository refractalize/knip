import { _load } from '../../util/loader.js';
import { timerify } from '../../util/performance.js';
import type { IsPluginEnabledCallback, GenericPluginCallback } from '../../types/plugins.js';
import type { CapacitorConfig } from './types.js';

// https://capacitorjs.com/docs/config

export const NAME = 'Capacitor';

/** @public */
export const ENABLERS = ['@capacitor/core', '@capacitor/cli'];

export const isEnabled: IsPluginEnabledCallback = ({ dependencies }) =>
  ENABLERS.some(enabler => dependencies.has(enabler));

export const CONFIG_FILE_PATTERNS = ['capacitor.config.ts'];

const findCapacitorDependencies: GenericPluginCallback = async configFilePath => {
  const config: CapacitorConfig = await _load(configFilePath);
  return config.includePlugins ?? [];
};

export const findDependencies = timerify(findCapacitorDependencies);
