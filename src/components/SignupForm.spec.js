import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';
import SignupForm from './SignupForm';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('SignupForm', () => {
  it('renders a form with an input field for email, password, password confirmation as well as a signup button', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignupForm />
        </AuthProvider>
      </MemoryRouter>
    );
    const inputEmail = screen.getByLabelText('E-MAIL');
    const inputPassword = screen.getByLabelText('PASSWORD');
    const inputPasswordConfirmation = screen.getByLabelText(
      'PASSWORD CONFIRMATION'
    );
    const button = screen.getByRole('button', { name: /sign up/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPasswordConfirmation).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('renders a link to log in', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignupForm />
        </AuthProvider>
      </MemoryRouter>
    );

    const linkLogin = screen.getByRole('link', { name: /log in/i });

    expect(linkLogin).toBeInTheDocument();
  });
});
