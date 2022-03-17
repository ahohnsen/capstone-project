import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StartScreen from './StartScreen.js';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('StartScreen', () => {
  it('renders the starting screen with the logo of the app', () => {
    render(
      <MemoryRouter>
        <StartScreen />
      </MemoryRouter>
    );
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });
});
