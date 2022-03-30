import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import { DefaultButton } from './Button.js';

export default function ForgotPasswordForm() {
  const { register, handleSubmit } = useForm({});
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      {error && <Alert type="error">{error}</Alert>}
      {message && <Alert type="success">{message}</Alert>}
      <Form onSubmit={handleSubmit(data => onSubmit(data))}>
        <Label>
          E-MAIL
          <Input type="email" {...register('email', { required: true })} />
        </Label>
        <ResetButton disabled={loading}>RESET PASSWORD</ResetButton>
        <Text>
          Remember your password again?
          <StyledLink to="/login"> Log in.</StyledLink>
        </Text>
        <Text>
          Need an account?
          <StyledLink to="/signup"> Create one.</StyledLink>
        </Text>
      </Form>
    </>
  );

  async function onSubmit(data) {
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(data.email);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  }
}

const Form = styled.form`
  display: grid;
  gap: 4px;
  width: 80%;
  padding: 15px;
  background-color: var(--bg-color-form);
  box-shadow: 2px 2px 4px var(--bg-color-boxshadow);
  border-radius: 4px;
`;

const Label = styled.label`
  color: var(--font-color-action);
  font-weight: 400;
`;

const Input = styled.input`
  width: 100%;
  padding: 7px;
  border: 0;
  border-radius: 4px;
`;

const ResetButton = styled(DefaultButton)`
  width: 100%;
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  color: var(--font-color-action);
  text-align: center;
`;

const Text = styled.span`
  color: var(--font-color-action);
  text-align: center;
`;

const Alert = styled.div`
  padding: 8px;
  width: 80%;
  background-color: rgba(255, 255, 255, 70%);
  color: ${props => (props.type === 'error' ? 'red' : 'green')};
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  border-radius: 4px;
`;
