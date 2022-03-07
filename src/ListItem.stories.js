import ListItem from './ListItem';

export default {
  title: 'Component/ListItem',
  component: ListItem,
};

const Template = args => <ListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  destination: 'Maldives',
  notes:
    'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
};
