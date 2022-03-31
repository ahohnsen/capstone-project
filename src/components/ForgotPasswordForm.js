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
        <Container>
          <Text>
            Remember your password again?
            <StyledLink to="/login"> Log in.</StyledLink>
          </Text>
          <Text>
            Need an account?
            <StyledLink to="/signup"> Create one.</StyledLink>
          </Text>
        </Container>
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
  gap: 10px;
  padding: 15px;
  width: 80%;
  border-radius: 4px;
  background-color: var(--bg-color-form);
  box-shadow: 2px 2px 4px var(--bg-color-boxshadow);
`;

const Label = styled.label`
  font-weight: 400;
  color: var(--font-color-action);
`;

const Input = styled.input`
  padding: 7px;
  width: 100%;
  border: 0;
  border-radius: 4px;

  &:focus {
    outline: none;
  }
`;

const ResetButton = styled(DefaultButton)`
  width: 100%;
`;

const Container = styled.div`
  text-align: center;
  color: var(--font-color-action);
`;

const StyledLink = styled(Link)`
  color: var(--font-color-action);
`;

const Text = styled.span`
  display: block;
`;

const Alert = styled.div`
  padding: 4px;
  width: 80%;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 70%);
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => (props.type === 'error' ? 'red' : 'green')};
`;
