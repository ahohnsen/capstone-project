import Heading from './Heading';

export default {
  title: 'Component/Heading',
  component: Heading,
};

const Template = args => <Heading {...args} />;

export const Default = Template.bind({});
Default.args = { children: 'Diving Wishlist' };
