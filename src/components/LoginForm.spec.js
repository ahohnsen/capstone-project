import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';
import LoginForm from './LoginForm';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('LoginForm', () => {
  it('renders a form with an input field for email and password as well as a login button', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </MemoryRouter>
    );

    const inputEmail = screen.getByLabelText('E-MAIL');
    const inputPassword = screen.getByLabelText('PASSWORD');
    const button = screen.getByRole('button', { name: /login/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('renders a link to create an account and one to reset the password', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </MemoryRouter>
    );

    const linkSignup = screen.getByRole('link', { name: /create one/i });
    const linkResetPassword = screen.getByRole('link', {
      name: /forgot password/i,
    });

    expect(linkSignup).toBeInTheDocument();
    expect(linkResetPassword).toBeInTheDocument();
  });
});
