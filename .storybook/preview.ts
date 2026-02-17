import type { Preview } from '@storybook/nextjs';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/app/globals.scss';

// MSW を Storybook 上で初期化
initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  loaders: [mswLoader],
};

export default preview;
