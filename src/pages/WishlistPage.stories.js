import WishlistPage from './WishlistPage';

export default {
  title: 'Pages/WishlistPage',
  component: WishlistPage,
};

const Template = args => <WishlistPage {...args} />;

export const WishlistPageDefault = Template.bind({});
WishlistPageDefault.args = {
  sortedPosts: [
    {
      destination: 'Maldives',
      notes:
        'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
      isArchived: false,
      isBookmarked: true,
    },
    {
      destination: 'Lanzarote',
      notes: 'I want to go there again soon to see my former colleauges.',
      isArchived: false,
      isBookmarked: false,
    },
  ],
};

export const WishlistPageWithArchive = Template.bind({});
WishlistPageWithArchive.args = {
  sortedPosts: [
    {
      destination: 'Maldives',
      notes:
        'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
      isArchived: false,
    },
    {
      destination: 'Lanzarote',
      notes: 'I want to go there again soon to see my former colleauges.',
      isArchived: true,
    },
  ],
};

export const WishlistPageEmpty = Template.bind({});
WishlistPageEmpty.args = {
  sortedPosts: [],
};

export const WishlistWithDatabaseError = Template.bind({});
WishlistWithDatabaseError.args = {
  sortedPosts: [],
  hasError: true,
};

export const WishlistWithLoadingSpinner = Template.bind({});
WishlistWithLoadingSpinner.args = {
  sortedPosts: [],
  isLoading: true,
};
