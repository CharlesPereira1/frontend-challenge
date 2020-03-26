import { darken } from 'polished';
import styled from 'styled-components';

import { colors } from '~/styles/colors';

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 22px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }

  > a {
    padding-top: 10px;
    font-size: 16px;
    display: flex;
    color: ${colors.primary};

    &:hover {
      color: ${darken(0.03, colors.primary)};
    }
  }
`;

export default Container;
