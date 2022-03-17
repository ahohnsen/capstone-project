import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';
import ForgotPasswordForm from './ForgotPasswordForm';

describe('ForgotPasswordForm', () => {
  it('renders a form with an input field for the email and a button to reset the password', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ForgotPasswordForm />
        </AuthProvider>
      </MemoryRouter>
    );
    const inputEmail = screen.getByRole('input', { name: 'email' });
    const button = screen.getByRole('button', { name: /reset/i });

    expect(inputEmail).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
