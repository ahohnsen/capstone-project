import BuddiesList from './BuddiesList';

export default {
  title: 'Component/BuddiesList',
  component: BuddiesList,
};

const Template = args => <BuddiesList {...args} />;

export const Default = Template.bind({});
Default.args = {
  users: [{ fullname: 'John Doe' }],
  searchValue: '',
};
