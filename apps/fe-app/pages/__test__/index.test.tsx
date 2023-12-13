import { RenderResult, act, cleanup, render } from '@testing-library/react';

import Home from '../index';

describe('Home UT', () => {
  let component: RenderResult | undefined = undefined;
  beforeAll(() => {});

  afterEach(() => {
    cleanup();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeTruthy();
  });

  it('Should match snapshot of Home page', async () => {
    await act(() => {
      component = render(<Home />);
    });
    const { asFragment } = component || { asFragment: () => DocumentFragment };
    expect(asFragment()).toMatchSnapshot();
  });
});
