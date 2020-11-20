import { mount } from '@vue/test-utils';
import { render } from '@testing-library/vue';
import Avatar from './Avatar.vue';
import Thumbnail from './Thumbnail.vue';

describe(`when there are NO errors loading the thumbnail`, () => {
  it(`should render the agent thumbnail`, () => {
    const { getByTestId, queryByTestId } = render(Thumbnail, {
      propsData: {
        src: 'https://some_valid_url.com',
      },
      data() {
        return {
          imgError: false,
        };
      },
    });
    expect(getByTestId('image')).toBeInTheDocument();
    expect(queryByTestId('avatar')).not.toBeInTheDocument();
  });
});

describe(`when there ARE errors loading the thumbnail`, () => {
  it(`should render the agent avatar`, () => {
    const { getByTestId, queryByTestId } = render(Thumbnail, {
      propsData: {
        src: 'https://some_invalid_url.com',
      },
      data() {
        return {
          imgError: true,
        };
      },
    });
    expect(getByTestId('avatar')).toBeInTheDocument();
    expect(queryByTestId('image')).not.toBeInTheDocument();
  });
});

describe(`when Avatar shows`, () => {
  it(`initials shold correspond to username`, () => {
    const { getByText } = render(Thumbnail, {
      propsData: {
        username: 'Angie Rojas',
      },
    });
    expect(getByText('AR')).toBeInTheDocument();
  });
});
