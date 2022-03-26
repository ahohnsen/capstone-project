import IconButton from './IconButton.js';
import BookmarkIconInactive from '../images/BookmarkInactive.svg';
import BookmarkIconActive from '../images/BookmarkActive.svg';
import CheckIconInactive from '../images/CheckInactive.svg';
import CheckIconActive from '../images/CheckActive.svg';
import EditIcon from '../images/EditIcon.svg';
import DeleteIcon from '../images/DeleteIcon.svg';
import ArrowForward from '../images/ArrowForward.svg';
import Calendar from '../images/Calendar.svg';
import Location from '../images/Location.svg';

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
ArrowForwardButton.args = { children: <img src={ArrowForward} alt="abort" /> };

export const LocationIcon = Template.bind({});
LocationIcon.args = { children: <img src={Location} alt="abort" /> };

export const CalendarIcon = Template.bind({});
CalendarIcon.args = { children: <img src={Calendar} alt="abort" /> };
