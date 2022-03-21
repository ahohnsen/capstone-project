import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';
import LoginSignupForm from './LoginSignupForm';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('LoginSignupForm', () => {
  it('renders a form with an input field for email and password as well as a login button when status is "login"', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginSignupForm status="login" />
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

  it('renders a link to create an account and one to reset the password when status is "login"', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginSignupForm status="login" />
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

  it('renders a form with an input field for email, password and passsword confirmation as well as a login button when status is "signup"', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginSignupForm status="signup" />
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

  it('renders a link to login when status is "signup"', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginSignupForm status="signup" />
        </AuthProvider>
      </MemoryRouter>
    );

    const linkLogin = screen.getByRole('link', { name: /Log in/i });

    expect(linkLogin).toBeInTheDocument();
  });
});
