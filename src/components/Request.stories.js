import Request from './Request.js';

export default {
  title: 'Component/Request',
  component: Request,
};

const Template = args => <Request {...args} />;

export const RequestNotBookmarked = Template.bind({});
RequestNotBookmarked.args = {
  startDate: '2022-03-23T00:00:00.000Z',
  endDate: '2022-03-29T00:00:00.000Z',
  createdDate: '2022-02-03T00:00:00.000Z',
  destination: 'Maldives',
  description:
    'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
  author: { fullname: 'John Doe', _id: 'john@doe.com' },
  currentUserData: { _id: 'jane@doe.com' },
};

export const RequestBookmarked = Template.bind({});
RequestBookmarked.args = {
  startDate: '2022-03-23T00:00:00.000Z',
  endDate: '2022-03-29T00:00:00.000Z',
  createdDate: '2022-02-03T00:00:00.000Z',
  destination: 'Maldives',
  description:
    'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
  isBookmarked: true,
  author: { fullname: 'John Doe', _id: 'john@doe.com' },
  currentUserData: { _id: 'jane@doe.com' },
};

export const OwnRequestArchived = Template.bind({});
OwnRequestArchived.args = {
  startDate: '2022-03-23T00:00:00.000Z',
  endDate: '2022-03-29T00:00:00.000Z',
  createdDate: '2022-02-03T00:00:00.000Z',
  destination: 'Maldives',
  description:
    'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
  isArchived: true,
  author: { fullname: 'John Doe', _id: 'john@doe.com' },
  currentUserData: { _id: 'john@doe.com' },
};

export const OwnRequestNotArchived = Template.bind({});
OwnRequestNotArchived.args = {
  startDate: '2022-03-23T00:00:00.000Z',
  endDate: '2022-03-29T00:00:00.000Z',
  createdDate: '2022-02-03T00:00:00.000Z',
  destination: 'Maldives',
  description:
    'My last diving holidays in the Maldives were perfect! I wanna go there again as soon as possible. But next time I want to do a liveaboard.',
  isArchived: false,
  author: { fullname: 'John Doe', _id: 'john@doe.com' },
  currentUserData: { _id: 'john@doe.com' },
};
