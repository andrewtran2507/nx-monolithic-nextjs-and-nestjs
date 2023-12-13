import { render } from '@testing-library/react';

import SimpleLayout from './index';

describe('SimpleLayout UT', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SimpleLayout>
      <p>should render successfully</p>
    </SimpleLayout>);
    expect(baseElement).toBeTruthy();
  });
});
