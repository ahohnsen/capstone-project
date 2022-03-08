import WishlistPage from './WishlistPage';

export default {
  title: 'Pages/WishlistPage',
  component: WishlistPage,
};

const Template = args => <WishlistPage {...args} />;

export const WishlistPageDefault = Template.bind({});
WishlistPageDefault.args = {
  diveWishes: [
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

export const WishlistPageEmpty = Template.bind({});
WishlistPageEmpty.args = {
  diveWishes: [],
};
