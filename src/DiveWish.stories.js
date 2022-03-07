import DiveWish from './DiveWish.js';

export default {
  title: 'Component/DiveWish',
  component: DiveWish,
};

const Template = args => <DiveWish {...args} />;

export const Default = Template.bind({});
Default.args = {
  destination: 'Maldives',
  notes:
    'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
};
