import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import Content from '../components/Content.js';
import { IconButton } from '../components/Button.js';
import Message from '../components/Message.js';
import ArrowForward from '../images/ArrowForward.svg';
import LogoutIcon from '../images/LogoutIcon.svg';
import ArrowBack from '../images/ArrowBackBackground.svg';
import DivesIcon from '../images/Dives.svg';
import DivingLicenseIcon from '../images/DivingLicense.svg';
import EmailIcon from '../images/Email.svg';
import FacebookIcon from '../images/Facebook.svg';
import EditIcon from '../images/EditIcon.svg';
import BackgroundPlaceholder from '../images/BackgroundPlaceholder.jpg';
import ProfilePlaceholder from '../images/ProfilePlaceholder.jpg';
import { useEffect } from 'react';

export default function ProfilePage({ sortedPosts }) {
  const { logout, error, currentUserData, users } = useAuth();
  const [userProfileData, setUserProfileData] = useState();
  const [userPosts, setUserPosts] = useState();
  const navigate = useNavigate();
  const { uid } = useParams();

  useEffect(() => {
    if (uid !== 'own-profile') {
      setUserProfileData(users.find(user => user.userId === uid));
    } else {
      setUserProfileData(currentUserData);
    }
    setUserPosts(
      sortedPosts?.filter(
        post => post.author.userId === userProfileData?.userId
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, userProfileData, currentUserData]);

  return (
    <>
      <Header>
        <BackgroundImageContainer
          backgroundImage={
            userProfileData?.background
              ? userProfileData?.background
              : BackgroundPlaceholder
          }
        >
          <ProfileImage
            profileImage={
              userProfileData?.photo
                ? userProfileData?.photo
                : ProfilePlaceholder
            }
          />
        </BackgroundImageContainer>
        {currentUserData?._id === userProfileData?._id ? (
          <>
            <LogoutButton onClick={logout}>
              <img src={LogoutIcon} alt="logout" />
            </LogoutButton>
            <EditButton onClick={() => navigate('/edit-profile')}>
              <img src={EditIcon} alt="edit profile" />
            </EditButton>
          </>
        ) : (
          <BackButton onClick={() => navigate(-1)}>
            <img src={ArrowBack} alt="go back" />
          </BackButton>
        )}
      </Header>
      <Content>
        <Username>{userProfileData?.fullname}</Username>
        <HomeLocation>
          {userProfileData?.location
            ? userProfileData?.location
            : '- no home location added -'}
        </HomeLocation>
        {error && <Message>{error}</Message>}
        <ExperienceContainer>
          <EmailContact
            href={`mailto:${userProfileData?._id}`}
            onlyContact={!userProfileData?.facebook ? true : false}
          >
            <img src={EmailIcon} alt="send email" width="30" height="30" />
          </EmailContact>
          {userProfileData?.facebook && (
            <FacebookContact href={userProfileData?.facebook} target="_blank">
              <img
                src={FacebookIcon}
                alt="go to Facebook profile"
                width="30"
                height="30"
              />
            </FacebookContact>
          )}
          <SectionHeading>DIVING EXPERIENCE</SectionHeading>
          <GridContainer>
            <img src={DivingLicenseIcon} alt="Diving License" />
            {userProfileData?.license
              ? userProfileData?.license
              : '- no diving license choosen -'}
            <Icon src={DivesIcon} alt="Number of dives" />
            {userProfileData?.dives
              ? userProfileData?.dives
              : '- no number of dives added -'}
          </GridContainer>
        </ExperienceContainer>
        <Container>
          <SectionHeading>ABOUT ME</SectionHeading>
          <Text>
            {userProfileData?.about
              ? userProfileData?.about
              : '- no profile information added -'}
          </Text>
        </Container>

        {userPosts?.length > 0 && (
          <Container>
            <SectionHeading>
              POSTS
              <ArrowButton
                onClick={() =>
                  navigate(`/user-requests/${userProfileData.userId}`)
                }
              >
                <img src={ArrowForward} alt="see all posts" />
              </ArrowButton>
            </SectionHeading>
          </Container>
        )}
      </Content>
    </>
  );
}

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 230px;
  background-color: var(--bg-color-main);
`;

const BackgroundImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background: ${props => `url(${props.backgroundImage})`} no-repeat center
    center;
  background-size: cover;
`;

const ProfileImage = styled.div`
  position: absolute;
  background-color: white;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  border: 3px solid var(--bg-color-section);
  background: ${props => `url(${props.profileImage})`} no-repeat center center;
  background-size: cover;
  z-index: 1;
`;

const EditButton = styled(IconButton)`
  position: absolute;
  bottom: 40px;
  right: 5px;
`;

const LogoutButton = styled(IconButton)`
  position: absolute;
  padding: 5px 10px;
  top: 2px;
  right: 0;
`;

const BackButton = styled(IconButton)`
  position: absolute;
  padding: 5px 10px;
  top: 2px;
  left: 0;
`;

const Container = styled.section`
  margin: 15px 0;
  padding: 10px 15px;
  position: relative;
  background-color: var(--bg-color-section);
  box-shadow: 1px 1px 2px var(--color-boxshadow);
  color: var(--font-color-heading);
`;

const ExperienceContainer = styled(Container)`
  margin-top: 50px;
`;

const SectionHeading = styled.h3`
  padding: 5px 0;
  font-size: 1.1rem;
  font-weight: 500;
`;

const Username = styled.h2`
  text-align: center;
  color: var(--font-color-heading);
`;

const HomeLocation = styled(SectionHeading)`
  padding: 10px;
  text-align: center;
  color: var(--font-color-sub-heading);
`;

const GridContainer = styled.div`
  padding: 5px 0;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto 1fr;
  gap: 8px;
  place-items: center;
  justify-items: start;
`;

const Icon = styled.img`
  padding: 0 4px;
`;

const EmailContact = styled.a`
  position: absolute;
  top: -35px;
  right: ${props => (props.onlyContact ? '10px' : '45px')};
`;

const FacebookContact = styled.a`
  position: absolute;
  top: -35px;
  right: 10px;
`;

const Text = styled.p`
  padding-bottom: 10px;
`;

const ArrowButton = styled(IconButton)`
  padding: 5px 10px;
  position: absolute;
  top: 9px;
  right: 0;
`;
