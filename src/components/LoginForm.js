import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import Button from './Button.js';

export default function LoginForm() {
  const { register, handleSubmit } = useForm({});
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit(data => onSubmit(data))}>
        <Label>
          E-MAIL
          <Input type="email" {...register('email', { required: true })} />
        </Label>
        <Label>
          PASSWORD
          <Input
            type="password"
            {...register('password', { required: true })}
          />
        </Label>
        <LoginButton disabled={loading}>LOGIN</LoginButton>
        <RegisterText>
          Need an account?
          <StyledLink to="/start/signup"> Create one.</StyledLink>
        </RegisterText>
        <StyledLink to="/start/forgot-password">Forgot password?</StyledLink>
      </Form>
    </>
  );

  async function onSubmit(data) {
    console.log(data.email, data.password);
    try {
      setError('');
      setLoading(true);
      await login(data.email, data.password);
      navigate('/');
    } catch {
      setError('Failed to log in');
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

const LoginButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  color: var(--font-color-action);
  text-align: center;
`;

const RegisterText = styled.span`
  color: var(--font-color-action);
  text-align: center;
`;

const ErrorMessage = styled.div`
  padding: 8px;
  width: 80%;
  background-color: rgba(255, 255, 255, 70%);
  color: red;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  border-radius: 4px;
`;