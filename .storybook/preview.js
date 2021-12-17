
// import { withInfo } from '@storybook/addon-info';
import { addDecorator } from '@storybook/react';

import { withPropsTable } from 'storybook-addon-react-docgen';

addDecorator(withPropsTable)

import '../src/styles/index.scss'

// addDecorator(withInfo); 

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}