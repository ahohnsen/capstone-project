import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IconButton } from './Button.js';
import ProfilePlaceholder from '../images/ProfilePlaceholder.jpg';
import ArrowForward from '../images/ArrowForward.svg';

export default function BuddiesList({ users, searchValue }) {
  const navigate = useNavigate();

  return (
    <>
      {users
        .filter(user =>
          user.fullname
            .trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase())
        )
        .map(user => (
          <Container key={user.userId}>
            <ProfilePicture
              data-testid="user avatar"
              profileImage={user.photo ? user.photo : ProfilePlaceholder}
            />
            {user.fullname}
            <ArrowButton onClick={() => navigate(`/profile/${user.userId}`)}>
              <img src={ArrowForward} alt="go to user profile" />
            </ArrowButton>
          </Container>
        ))}
    </>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  padding: 5px 15px;
  align-items: center;
  background-color: var(--bg-color-section);
  box-shadow: 1px 1px 2px var(--color-boxshadow);
  font-size: 1.1rem;
  font-weight: 500;
`;

const ProfilePicture = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => `url(${props.profileImage})`} no-repeat center center;
  background-size: cover;
  box-shadow: 1px 1px 4px 1px var(--color-boxshadow);
`;

const ArrowButton = styled(IconButton)`
  padding: 12px 0 6px;
`;
