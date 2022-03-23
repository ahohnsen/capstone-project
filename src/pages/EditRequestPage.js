import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import RequestForm from '../components/RequestForm.js';
import IconButton from '../components/IconButton.js';
import AbortIcon from '../images/Abort.svg';

export default function EditRequestPage({ onEditPost, postToEdit }) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <AbortButton onClick={() => navigate(-1)}>
          <img src={AbortIcon} alt="abort editing" />
        </AbortButton>
        Edit your post
      </Header>
      <Content>
        <RequestForm
          formName={'Edit your buddy request'}
          buttonName={'SAVE CHANGES'}
          handlePost={onEditPost}
          preloadedValues={postToEdit}
        />
      </Content>
    </>
  );
}

const AbortButton = styled(IconButton)`
  padding: 5px 10px;
  top: 3px;
  left: 10px;
`;
