import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';
import StartScreen from './StartScreen.js';

describe('StartScreen', () => {
  it('renders the starting screen with the logo of the app', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <StartScreen />
        </AuthProvider>
      </MemoryRouter>
    );
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });
});
