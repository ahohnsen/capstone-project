import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import DiveWishForm from '../components/DiveWishForm.js';
import IconButton from '../components/IconButton.js';
import AbortIcon from '../images/Abort.svg';

export default function EditWishPage({ onEditDiveWish, diveWishToEdit }) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <AbortButton onClick={() => navigate('/')}>
          <img src={AbortIcon} alt="abort editing" />
        </AbortButton>
        Edit dive destination
      </Header>
      <Content>
        <DiveWishForm
          formName={'Edit your dive wish'}
          buttonName={'Save changes'}
          handleDiveWish={onEditDiveWish}
          preloadedValues={diveWishToEdit}
        />
      </Content>
    </>
  );
}

const AbortButton = styled(IconButton)`
  padding: 5px 10px;
  top: 5px;
  left: 10px;
`;
