import RequestsList from './RequestsList';

export default {
  title: 'Component/RequestsList',
  component: RequestsList,
};

const Template = args => <RequestsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  posts: [
    {
      startDate: '2022-03-23T00:00:00.000Z',
      endDate: '2022-03-29T00:00:00.000Z',
      createdDate: '2022-02-03T00:00:00.000Z',
      destination: 'Maldives',
      description:
        'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
      author: { fullname: 'John Doe', _id: 'john@doe.com' },
    },
    {
      startDate: '2022-03-23T00:00:00.000Z',
      endDate: '2022-03-29T00:00:00.000Z',
      createdDate: '2022-03-07T00:00:00.000Z',
      destination: 'Lanzarote',
      description:
        'Would love to go back to Lanzarote to see some of my former colleagues. Who wants to join me?',
      author: { fullname: 'Jane Doe', _id: 'jane@doe.com' },
    },
  ],
  searchValue: '',
};
