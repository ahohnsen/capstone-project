import Content from './Content';

export default {
  title: 'Component/Content',
  component: Content,
};

const Template = args => <Content {...args} />;

export const Default = Template.bind({});
Default.args = { children: 'Here will go content of the main area' };
