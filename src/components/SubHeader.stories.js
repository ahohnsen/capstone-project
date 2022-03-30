import SubHeader from './SubHeader';

export default {
  title: 'Component/SubHeader',
  component: SubHeader,
};

const Template = args => <SubHeader {...args} />;

export const SearchCategoryDestination = Template.bind({});
SearchCategoryDestination.args = { searchCategory: 'destination' };

export const SearchCategoryBuddies = Template.bind({});
SearchCategoryBuddies.args = { searchCategory: 'buddies' };
