import IconButton from './IconButton.js';
import BookmarkIconInactive from '../images/BookmarkInactive.svg';
import BookmarkedIcon from '../images/Bookmarked.svg';
import CheckIconInactive from '../images/CheckInactive.svg';
import CheckIconActive from '../images/CheckActive.svg';
import EditIcon from '../images/EditIcon.svg';
import DeleteIcon from '../images/DeleteIcon.svg';
import ArrowForward from '../images/ArrowForward.svg';
import ArrowBack from '../images/ArrowBackBackground.svg';
import Camera from '../images/Camera.svg';
import Logout from '../images/LogoutIcon.svg';

export default {
  title: 'Component/IconButton',
  component: IconButton,
};

const Template = args => <IconButton {...args} />;

export const BookmarkButtonInactive = Template.bind({});
BookmarkButtonInactive.args = {
  children: <img src={BookmarkIconInactive} alt="not bookmarked" />,
};

export const BookmarkButtonActive = Template.bind({});
BookmarkButtonActive.args = {
  children: <img src={BookmarkedIcon} alt="is bookmarked" />,
};

export const CheckmarkButtonInactive = Template.bind({});
CheckmarkButtonInactive.args = {
  children: <img src={CheckIconInactive} alt="not archived" />,
};

export const CheckmarkButtonActive = Template.bind({});
CheckmarkButtonActive.args = {
  children: <img src={CheckIconActive} alt="is archived" />,
};

export const EditButton = Template.bind({});
EditButton.args = { children: <img src={EditIcon} alt="edit" /> };

export const DeleteButton = Template.bind({});
DeleteButton.args = { children: <img src={DeleteIcon} alt="abort" /> };

export const ArrowForwardButton = Template.bind({});
ArrowForwardButton.args = {
  children: <img src={ArrowForward} alt="show details" />,
};

export const ArrowBackButton = Template.bind({});
ArrowBackButton.args = { children: <img src={ArrowBack} alt="go back" /> };

export const ImageUploadButton = Template.bind({});
ImageUploadButton.args = { children: <img src={Camera} alt="upload avatar" /> };

export const LogoutButton = Template.bind({});
LogoutButton.args = { children: <img src={Logout} alt="logout" /> };
