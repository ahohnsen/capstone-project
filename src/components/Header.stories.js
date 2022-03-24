import Header from './Header';

export default {
  title: 'Component/Header',
  component: Header,
};

const Template = args => <Header {...args} />;

export const HeaderDefault = Template.bind({});
HeaderDefault.args = { children: 'Find a dive buddy' };
