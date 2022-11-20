import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';

module.exports = {
  title: '@larajs/core',
  description: 'Just playing around.',
  themeConfig: {
    repo: 'https://github.com/maingocthanhtan96/larajs-core',
    sidebar: [
      {
        text: 'Introduction',
        children: [
          { text: 'What is @larajs/core?', link: '/' },
          { text: 'Getting Started', link: '/guide/' },
        ],
      },
      {
        text: 'Components',
        children: [
          { text: 'SvgIcon', link: '/components/svg-icon' },
          { text: 'Pagination', link: '/components/pagination' },
          { text: 'BaseDialog', link: '/components/base-dialog' },
          { text: 'VueHoverMask', link: '/components/vue-hover-mask' },
        ],
      },
    ],
  },
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@larajs/core': path.resolve(__dirname, '../../src'),
      },
      dedupe: ['vue'], // avoid error when using dependencies that also use Vue
    },
  },
};
