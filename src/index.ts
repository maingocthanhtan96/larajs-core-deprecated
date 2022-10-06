import { App } from 'vue';
import * as components from './components';
import ElementPlus from 'element-plus';

function install(app: App) {
  for (const key in components) {
    // @ts-expect-error
    app.component(key, components[key]);
  }
  app.use(ElementPlus, { size: 'default' });
}

import './assets/main.scss';

export default { install };

export * from './components';
export * from './constants';
export * from './utils';
