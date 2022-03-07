import Wishlist from './Wishlist';

export default {
  title: 'Component/Wishlist',
  component: Wishlist,
};

const Template = args => <Wishlist {...args} />;

export const WishlistDefault = Template.bind({});
WishlistDefault.args = {
  listItems: [
    {
      destination: 'Maldives',
      notes:
        'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
    },
    {
      destination: 'Lanzarote',
      notes: 'I want to go there again soon to see my former colleauges.',
    },
  ],
};

export const WishlistEmpty = Template.bind({});
WishlistEmpty.args = {
  listItems: [],
};
