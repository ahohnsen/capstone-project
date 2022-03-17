import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('renders a form with an input field for email and password as well as a login button', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </MemoryRouter>
    );
    const inputEmail = screen.getByRole('input', { name: 'email' });
    const inputPassword = screen.getByRole('input', { name: 'password' });
    const button = screen.getByRole('button', { name: /login/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
