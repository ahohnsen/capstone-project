import BookmarksPage from './BookmarksPage';

export default {
  title: 'Pages/BookmarksPage',
  component: BookmarksPage,
};

const Template = args => <BookmarksPage {...args} />;

export const BookmarksPageDefault = Template.bind({});
BookmarksPageDefault.args = {
  bookmarkedPosts: [
    {
      destination: 'Maldives',
      notes:
        'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
      isBookmarked: true,
    },
    {
      destination: 'Lanzarote',
      notes: 'I want to go there again soon to see my former colleauges.',
      isBookmarked: true,
    },
  ],
};

export const BookmarksPageEmpty = Template.bind({});
BookmarksPageEmpty.args = {
  bookmarkedPosts: [],
};
