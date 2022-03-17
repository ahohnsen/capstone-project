import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';
import SignupForm from './SignupForm';

describe('SignupForm', () => {
  it('renders a form with an input field for email, password, password confirmation as well as a signup button', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignupForm />
        </AuthProvider>
      </MemoryRouter>
    );
    const inputEmail = screen.getByRole('input', { name: 'email' });
    const inputPassword = screen.getByRole('input', { name: 'password' });
    const inputPasswordConfirmation = screen.getByRole('input', {
      name: 'passwordConfirmation',
    });
    const button = screen.getByRole('button', { name: /signup/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPasswordConfirmation).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
