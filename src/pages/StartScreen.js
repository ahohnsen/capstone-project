import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import axios from 'axios';
import Content from '../components/Content.js';
import LoginSignupForm from '../components/LoginSignupForm.js';
import ForgotPasswordForm from '../components/ForgotPasswordForm.js';
import BackgroundImage from '../images/Ocean.jpg';
import ScubaMateLogo from '../images/ScubaMateLogo.svg';

export default function StartScreen() {
  const { signin } = useParams();
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Logo src={ScubaMateLogo} alt="ScubaMate Logo" />
      {signin === 'login' && (
        <LoginSignupForm
          status={'login'}
          onSubmit={onLogin}
          error={error}
          loading={loading}
        />
      )}
      {signin === 'signup' && (
        <LoginSignupForm
          status={'signup'}
          onSubmit={onSignup}
          error={error}
          loading={loading}
        />
      )}
      {signin === 'forgot-password' && <ForgotPasswordForm />}
    </Container>
  );

  async function onLogin(data) {
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

  async function onSignup(data) {
    if (data.password !== data.passwordConfirmation) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(data.email, data.password);
      saveNewUser({ email: data.email });
      navigate('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  async function saveNewUser(email) {
    try {
      await axios.post('/api/users', email);
    } catch (error) {
      console.log('Error', error.messages);
    }
  }
}

const Container = styled(Content)`
  display: grid;
  gap: 5px;
  grid-template-rows: 1fr auto;
  justify-items: center;
  height: 100vh;
  padding: 5px 5px 30px;
  background: url(${BackgroundImage}) no-repeat center center;
  background-size: cover;
`;
const Logo = styled.img`
  width: 100%;
`;
