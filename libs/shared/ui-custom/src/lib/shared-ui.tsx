'use client';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SharedUiProps {}

const StyledSharedUi = styled.div`
  color: pink;
`;

export function SharedUi(props: SharedUiProps) {
  return (
    <h1>Welcome to SharedUi!</h1>
  );
}

export default SharedUi;
