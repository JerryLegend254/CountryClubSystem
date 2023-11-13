import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const Error = styled.span`
  color: red;
`
// eslint-disable-next-line react/prop-types
function FormRow({ error, children }) {
  return (
    <StyledFormRow>
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
