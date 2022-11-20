import has from 'lodash/has';
const metaEnv = import.meta.env;
export const env = (key: string, defaultValue?: any) => (has(metaEnv, key) ? metaEnv[key] : defaultValue);
