import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import IconButton from '../components/IconButton.js';
import ArrowForward from '../images/ArrowForward.svg';
import LogoutIcon from '../images/LogoutIcon.svg';
import ArrowBack from '../images/ArrowBack.svg';
import DivesIcon from '../images/Dives.svg';
import DivingLicenseIcon from '../images/DivingLicense.svg';
import EmailIcon from '../images/Email.svg';
import FacebookIcon from '../images/Facebook.svg';

export default function ProfilePage() {
  const { logout, error, currentUserData, users } = useAuth();
  const navigate = useNavigate();
  const { uid } = useParams();

  const userData =
    uid !== 'own-profile'
      ? users.find(user => user.userId === uid)
      : currentUserData;

  return (
    <>
      <Header>
        {uid === 'own-profile' ? (
          <>
            Your profile
            <LogoutButton onClick={logout}>
              <img src={LogoutIcon} alt="logout" />
            </LogoutButton>
          </>
        ) : (
          <>
            <BackButton onClick={() => navigate(-1)}>
              <img src={ArrowBack} alt="go back" />
            </BackButton>
            Profile
          </>
        )}
      </Header>
      <Content>
        <Username>{userData?.fullname}</Username>
        <HomeLocation>
          {userData.location ? userData.location : '- no home location added -'}
        </HomeLocation>
        {error && <Message>{error}</Message>}

        <ExperienceContainer>
          <EmailContact
            href={`mailto:${userData._id}`}
            onlyContact={!userData.facebook ? 'true' : 'false'}
          >
            <img src={EmailIcon} alt="send email" />
          </EmailContact>
          {userData.facebook && (
            <FacebookContact href={'https://www.google.de'}>
              <img src={FacebookIcon} alt="go to Facebook profile" />
            </FacebookContact>
          )}
          <SectionHeading>DIVING EXPERIENCE</SectionHeading>
          <Wrapper>
            <img src={DivingLicenseIcon} alt="Diving License" />
            {userData.license
              ? userData.license
              : '- no diving license choosen -'}
            <Icon src={DivesIcon} alt="Number of dives" />
            {userData.dives ? userData.dives : '- no number of dives added -'}
          </Wrapper>
        </ExperienceContainer>
        <Container>
          <SectionHeading>ABOUT ME</SectionHeading>
          <Text>
            {userData.about
              ? userData.about
              : '- no profile information added -'}
          </Text>
        </Container>
        <Container>
          <SectionHeading>
            POSTS
            <ArrowButton
              onClick={() =>
                navigate(
                  uid !== 'own-profile'
                    ? `/user-requests/${uid}`
                    : 'user-requests/own-requests'
                )
              }
            >
              <img src={ArrowForward} alt="see all your posts" />
            </ArrowButton>
          </SectionHeading>
        </Container>
      </Content>
    </>
  );
}

const Container = styled.section`
  position: relative;
  background-color: var(--bg-color-section);
  padding: 10px 15px;
  margin: 15px 0;
  color: var(--font-color-heading);
`;

const ExperienceContainer = styled(Container)`
  margin-top: 40px;
`;

const SectionHeading = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  padding: 5px 0;
`;

const Username = styled.h2`
  text-align: center;
  color: var(--font-color-heading);
`;

const HomeLocation = styled(SectionHeading)`
  text-align: center;
  color: var(--font-color-sub-heading);
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto 1fr;
  gap: 8px;
  place-items: center;
  justify-items: start;
  padding: 5px 0;
`;

const Icon = styled.img`
  padding: 0 4px;
`;

const EmailContact = styled.a`
  position: absolute;
  top: -25px;
  right: ${props => (props.onlyContact ? '10px' : '35px')};
`;

const FacebookContact = styled.a`
  position: absolute;
  top: -25px;
  right: 10px;
`;

const Text = styled.p`
  padding-bottom: 10px;
`;

const Message = styled.span`
  text-align: center;
  padding: 0 15px;
`;

const LogoutButton = styled(IconButton)`
  position: absolute;
  padding: 5px 10px;
  top: 0;
  right: 0;
`;

const ArrowButton = styled(IconButton)`
  position: absolute;
  padding: 5px 10px;
  top: 9px;
  right: 0;
`;

const BackButton = styled(IconButton)`
  position: absolute;
  padding: 5px 10px;
  top: 2px;
  left: 5px;
`;
