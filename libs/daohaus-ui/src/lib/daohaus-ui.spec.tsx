import { render } from '@testing-library/react';

import DaohausUi from './daohaus-ui';

describe('DaohausUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DaohausUi />);
    expect(baseElement).toBeTruthy();
  });
});
