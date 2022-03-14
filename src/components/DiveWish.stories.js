import DiveWish from './DiveWish.js';

export default {
  title: 'Component/DiveWish',
  component: DiveWish,
};

const Template = args => <DiveWish {...args} />;

export const DiveWishNotBookmarked = Template.bind({});
DiveWishNotBookmarked.args = {
  destination: 'Maldives',
  notes:
    'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
};

export const DiveWishBookmarked = Template.bind({});
DiveWishBookmarked.args = {
  destination: 'Maldives',
  notes:
    'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
  isBookmarked: true,
};
