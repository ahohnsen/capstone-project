import ArchivePage from './ArchivePage';

export default {
  title: 'Pages/ArchivePage',
  component: ArchivePage,
};

const Template = args => <ArchivePage {...args} />;

export const ArchivePageDefault = Template.bind({});
ArchivePageDefault.args = {
  archivedWishes: [
    {
      destination: 'Maldives',
      notes:
        'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
      isArchived: true,
    },
    {
      destination: 'Lanzarote',
      notes: 'I want to go there again soon to see my former colleauges.',
      isArchived: true,
    },
  ],
};
