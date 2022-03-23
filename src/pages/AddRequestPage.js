import Header from '../components/Header.js';
import Content from '../components/Content.js';
import RequestForm from '../components/RequestForm.js';

export default function AddRequestPage({ onAddPost }) {
  return (
    <>
      <Header>Looking for a buddy?</Header>
      <Content>
        <RequestForm
          formName={'Add a request for a buddy'}
          buttonName={'POST'}
          handlePost={onAddPost}
        />
      </Content>
    </>
  );
}
