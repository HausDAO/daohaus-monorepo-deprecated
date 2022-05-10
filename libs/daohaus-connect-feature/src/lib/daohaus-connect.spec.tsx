import { render } from '@testing-library/react';

import DaohausConnect from './daohaus-connect';

describe('DaohausConnect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DaohausConnect />);
    expect(baseElement).toBeTruthy();
  });
});
