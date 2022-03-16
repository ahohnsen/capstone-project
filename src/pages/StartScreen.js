import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Content from '../components/Content.js';
import LoginForm from '../components/LoginForm.js';
import SignupForm from '../components/SignupForm.js';
import ForgotPasswordForm from '../components/ForgotPasswordForm.js';
import BackgroundImage from '../images/Ocean.jpg';
import ScubaMateLogo from '../images/ScubaMateLogo.svg';

export default function StartScreen() {
  const { login } = useParams();

  return (
    <Container>
      <Logo src={ScubaMateLogo} alt="ScubaMate Logo" />
      {login === 'login' && <LoginForm />}
      {login === 'signup' && <SignupForm />}
      {login === 'forgot-password' && <ForgotPasswordForm />}
    </Container>
  );
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
