import { render, screen } from '@testing-library/react';
import Home from '../../../pages';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: '',
      push: '',
    };
  },
}));

describe('Home page', () => {
  it('should render correctly', () => {
    // const { debug } = render(<Home />);

    // debug();
  });
});