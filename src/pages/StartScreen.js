import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import Content from '../components/Content.js';
import LoginSignupForm from '../components/LoginSignupForm.js';
import ForgotPasswordForm from '../components/ForgotPasswordForm.js';
import BackgroundImage from '../images/Ocean.jpg';
import ScubaMateLogo from '../images/ScubaMateLogo.svg';

export default function StartScreen() {
  const { signin } = useParams();
  const { login, signup, error, isButtonDeactivated } = useAuth();

  return (
    <Container>
      <Logo src={ScubaMateLogo} alt="ScubaMate Logo" />
      {signin === 'login' && (
        <LoginSignupForm
          status={'login'}
          onSubmit={login}
          error={error}
          isButtonDeactivated={isButtonDeactivated}
        />
      )}
      {signin === 'signup' && (
        <LoginSignupForm
          status={'signup'}
          onSubmit={signup}
          error={error}
          isButtonDeactivated={isButtonDeactivated}
        />
      )}
      {signin === 'forgot-password' && <ForgotPasswordForm />}
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
