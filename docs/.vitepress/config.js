import path from 'path';

module.exports = {
  title: '@larajs/core',
  description: 'Just playing around.',
  themeConfig: {
    repo: 'https://github.com/maingocthanhtan96/larajs-core',
    sidebar: [
      {
        text: 'Introduction',
        children: [
          { text: 'What is My Lib?', link: '/' },
          { text: 'Getting Started', link: '/guide/' },
        ],
      },
      {
        text: 'Components',
        children: [
          { text: 'SvgIcon', link: '/components/svg-icon' },
          { text: 'Pagination', link: '/components/pagination' },
        ],
      },
    ],
  },
  vite: {
    resolve: {
      alias: {
        '@larajs/core': path.resolve(__dirname, '../../src'),
      },
      dedupe: ['vue'], // avoid error when using dependencies that also use Vue
    },
  },
};
