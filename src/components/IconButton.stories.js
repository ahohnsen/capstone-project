import IconButton from './IconButton.js';
import BookmarkIconInactive from '../images/BookmarkInactive.svg';
import BookmarkIconActive from '../images/BookmarkActive.svg';
import EditIcon from '../images/EditIcon.svg';
import DeleteIcon from '../images/DeleteIcon.svg';

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
  children: <img src={BookmarkIconActive} alt="is bookmarked" />,
};

export const EditButton = Template.bind({});
EditButton.args = { children: <img src={EditIcon} alt="edit" /> };

export const DeleteButton = Template.bind({});
DeleteButton.args = { children: <img src={DeleteIcon} alt="abort" /> };
