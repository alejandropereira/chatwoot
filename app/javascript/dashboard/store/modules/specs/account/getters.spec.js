import { getters } from '../../accounts';

const accountData = {
  id: 1,
  name: 'Company one',
  locale: 'en',
  subdomain: 'company-one',
};

describe('#getters', () => {
  it('getAccount', () => {
    const state = {
      records: [accountData],
    };
    expect(getters.getAccount(state)('company-one')).toEqual(accountData);
  });
  it('getUIFlags', () => {
    const state = {
      uiFlags: {
        isFetching: true,
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
      },
    };
    expect(getters.getUIFlags(state)).toEqual({
      isFetching: true,
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
    });
  });
});
