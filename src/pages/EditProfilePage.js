import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Content from '../components/Content.js';
import Button from '../components/Button.js';
import IconButton from '../components/IconButton.js';
import ArrowBack from '../images/ArrowBackBackground.svg';
import CameraIcon from '../images/Camera.svg';
import BackgroundPlaceholder from '../images/BackgroundPlaceholder.jpg';
import ProfilePlaceholder from '../images/ProfilePlaceholder.jpg';

export default function EditProfilePage({
  currentUserData,
  onUpdateProfile,
  onUploadImage,
}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: currentUserData.fullname,
      location: currentUserData.location,
      license: currentUserData.license,
      dives: currentUserData.dives,
      facebook: currentUserData.facebook,
      about: currentUserData.about,
    },
  });

  return (
    <>
      <BackgroundImageContainer
        backgroundImage={
          currentUserData.background
            ? currentUserData.background
            : BackgroundPlaceholder
        }
      >
        <AbortButton onClick={() => navigate(-1)}>
          <img src={ArrowBack} alt="abort editing" width="30" height="30" />
        </AbortButton>
        <BackgroundPictureUpload htmlFor="uploadBackgroundImage">
          <img src={CameraIcon} alt="camera icon" width="30" height="30" />
          <input
            id="uploadBackgroundImage"
            name="uploadBackgroundImage"
            type="file"
            accept="image/png, image/jpeg"
            onChange={event => onUploadImage('background', event)}
            hidden
          />
        </BackgroundPictureUpload>
        <ProfileImageContainer>
          <ProfileImage
            profileImage={
              currentUserData.photo ? currentUserData.photo : ProfilePlaceholder
            }
          />
          <ProfilePictureUpload htmlFor="uploadProfileImage">
            <img src={CameraIcon} alt="camera icon" width="30" height="30" />
            <input
              id="uploadProfileImage"
              name="uploadProfileImage"
              type="file"
              accept="image/png, image/jpeg"
              onChange={event => onUploadImage('photo', event)}
              hidden
            />
          </ProfilePictureUpload>
        </ProfileImageContainer>
      </BackgroundImageContainer>
      <Content>
        <Form
          aria-label="edit your profile"
          onSubmit={handleSubmit(data => onUpdateProfile(data))}
        >
          <Container>
            <Label htmlFor="fullname">FULL NAME</Label>
            <Input
              {...register('fullname', {
                required: 'A full name is required.',
              })}
              id="fullname"
              onKeyUp={() => {
                trigger('fullname');
              }}
            />
          </Container>
          <Container>
            <Label htmlFor="location">HOME LOCATION</Label>
            <Input
              {...register('location', {
                required: ' A home location is required.',
              })}
              id="location"
              onKeyUp={() => {
                trigger('location');
              }}
            />
          </Container>

          <Container>
            <Label htmlFor="license">DIVING LICENSE</Label>
            <StyledSelect id="license" {...register('license')} defaultValue="">
              <option value="" disabled hidden>
                Select your license
              </option>
              <option value="Diver to be">Diver to be</option>
              <option value="Snorkeler">Snorkeler</option>
              <option value="Scuba Diver">Scuba Diver</option>
              <option value="Open Water Diver">Open Water Diver</option>
              <option value="Advanced Open Water Diver">
                Advanced Open Water Diver
              </option>
              <option value="Rescue Diver">Rescue Diver</option>
              <option value="Divemaster">Divemaster</option>
              <option value="Instructor">Instructor</option>
            </StyledSelect>
          </Container>
          <Container>
            <Label htmlFor="dives">NUMBER OF DIVES</Label>
            <StyledSelect id="dives" {...register('dives')} defaultValue="">
              <option value="" disabled hidden>
                Select the number of dives you have done
              </option>
              <option value="0 - 10"> 0 - 10</option>
              <option value="10 - 50">10 - 50</option>
              <option value="50 - 100">50 - 100</option>
              <option value="100 - 250">100 - 250</option>
              <option value="250 - 500">250 - 500</option>
              <option value="500 +">500 +</option>
            </StyledSelect>
          </Container>
          <Container>
            <Label htmlFor="facebook">FACEBOOK PROFILE LINK</Label>
            <Input
              {...register('facebook', {
                pattern: {
                  value: /^https?:\/\/(.*)/,
                  message: 'Please enter a valid Facebook URL',
                },
              })}
              id="facebook"
              placeholder="https://..."
              onKeyUp={() => {
                trigger('facebook');
              }}
            />
          </Container>
          <Container>
            <Label htmlFor="about">ABOUT ME</Label>
            <Textarea
              {...register('about', {
                maxLength: {
                  value: 300,
                  message:
                    'Your profile text is too long. Please shorten it a bit.',
                },
              })}
              id="about"
              onKeyUp={() => {
                trigger('about');
              }}
            />
          </Container>
          <Button type="submit">SAVE CHANGES</Button>
          <ErrorMessage>
            <p>{errors.fullname && errors.fullname.message}</p>
            <p>{errors.location && errors.location.message}</p>
            <p>{errors.about && errors.about.message}</p>
            <p>{errors.facebook && errors.facebook.message}</p>
          </ErrorMessage>
        </Form>
      </Content>
    </>
  );
}

const BackgroundImageContainer = styled.header`
  position: relative;
  height: 150px;
  width: 100%;
  max-width: 500px;
  margin-bottom: 90px;
  background: ${props => `url(${props.backgroundImage})`} no-repeat center
    center;
  background-size: cover;
`;

const BackgroundPictureUpload = styled.label`
  position: absolute;
  padding: 5px 10px;
  top: 2px;
  right: 0;
`;

const AbortButton = styled(IconButton)`
  position: absolute;
  padding: 5px 10px;
  top: 2px;
  left: 0;
`;

const ProfileImageContainer = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`;

const ProfilePictureUpload = styled.label`
  position: absolute;
  padding: 5px 10px;
  bottom: 50%;
  right: 0;
  transform: translate(0, +50%);
`;

const ProfileImage = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid var(--bg-color-section);
  background: ${props => `url(${props.profileImage})`} no-repeat center center;
  background-size: cover;
`;

const Form = styled.form`
  display: grid;
  gap: 25px;
  padding: 0 15px;
`;

const Label = styled.label`
  position: absolute;
  top: -13px;
  left: 15px;
  color: var(--font-color-label);
  font-weight: 500;
`;

const Input = styled.input`
  padding: 2px;
  border: 0;
`;

const Container = styled.div`
  position: relative;
  padding: 10px;
  border-radius: 4px;
  background-color: var(--bg-color-section);
  box-shadow: 1px 1px 4px var(--color-boxshadow);
`;

const StyledSelect = styled.select`
  padding: 5px 2px;
  border: 0;
  background-color: var(--bg-color-section);
`;

const Textarea = styled.textarea`
  height: 170px;
  padding: 2px;
  border: 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 0.8rem;
`;
