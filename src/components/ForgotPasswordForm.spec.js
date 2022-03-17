import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';
import ForgotPasswordForm from './ForgotPasswordForm';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('ForgotPasswordForm', () => {
  it('renders a form with an input field for the email and a button to reset the password', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ForgotPasswordForm />
        </AuthProvider>
      </MemoryRouter>
    );
    const inputEmail = screen.getByLabelText('E-MAIL');
    const button = screen.getByRole('button', { name: /reset/i });
    const link = screen.getByRole('link', { name: /log in/i });

    expect(inputEmail).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  it('renders a link to log in and one to create a new account.', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ForgotPasswordForm />
        </AuthProvider>
      </MemoryRouter>
    );

    const linkSignup = screen.getByRole('link', { name: /create one/i });
    const linkLogin = screen.getByRole('link', { name: /log in/i });

    expect(linkSignup).toBeInTheDocument();
    expect(linkLogin).toBeInTheDocument();
  });
});
