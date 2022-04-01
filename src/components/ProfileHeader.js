import styled from 'styled-components';
import BackgroundPlaceholder from '../images/BackgroundPlaceholder.jpg';

export default function ProfileHeader({ backgroundImage, children }) {
  return (
    <Header data-testid="1">
      <BackgroundImageContainer
        data-testid="2"
        backgroundImage={
          backgroundImage ? backgroundImage : BackgroundPlaceholder
        }
      >
        {children}
      </BackgroundImageContainer>
    </Header>
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
