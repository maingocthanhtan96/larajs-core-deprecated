import { App } from 'vue';
import { createPinia } from 'pinia';
import * as components from './components';

const LaraJSCore = {
  install(app: App) {
    // Auto import all components
    for (const key in components) {
      app.use((components as any)[key]);
    }
    app.use(createPinia());
  },
};
export default LaraJSCore;

export * from './constants';
export * from './utils';
export * from './uses';
export * from './components';
