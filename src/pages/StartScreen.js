import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Content from '../components/Content.js';
import LoginSignupForm from '../components/LoginSignupForm.js';
import ForgotPasswordForm from '../components/ForgotPasswordForm.js';
import BackgroundImage from '../images/Ocean.jpg';
import ScubaMateLogo from '../images/ScubaMateLogo.svg';

export default function StartScreen() {
  const { signin } = useParams();

  return (
    <Container>
      <Logo src={ScubaMateLogo} alt="ScubaMate Logo" />
      {signin === 'login' && <LoginSignupForm status={'login'} />}
      {signin === 'signup' && <LoginSignupForm status={'signup'} />}
      {signin === 'forgot-password' && <ForgotPasswordForm />}
    </Container>
  );
}

const Container = styled(Content)`
  padding: 5px 5px 30px;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 5px;
  justify-items: center;
  height: 100vh;
  background: url(${BackgroundImage}) no-repeat center center;
  background-size: cover;
`;
const Logo = styled.img`
  width: 100%;
`;
