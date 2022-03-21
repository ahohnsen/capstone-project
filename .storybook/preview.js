import GlobalStyles from '../src/GlobalStyles.js';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../src/contexts/AuthContext.js';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <MemoryRouter>
      <AuthProvider>
      <GlobalStyles />
      <Story />
      </AuthProvider>
    </MemoryRouter>
  ),
];