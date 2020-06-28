import styled from 'styled-components';
import { TransitionGroup } from 'react-transition-group';

export const FoodsContainer = styled(TransitionGroup)`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 0;
  margin-top: -140px;

  > div {
    display: grid;

    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px;
  }
`;
