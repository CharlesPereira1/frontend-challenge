import { darken } from 'polished';
import styled from 'styled-components';

import { colors } from '~/styles/colors';

export const List = styled.ul`
  max-width: 700px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  margin-top: 15px;
  justify-content: space-between;

  > li {
    display: flex;
    flex-direction: column;
    background: ${colors.background};
    border-radius: 4px;
    padding: 10px;

    a {
      display: flex;

      img {
        align-items: center;
        max-width: 120px;
        margin: 0 auto;
        margin-bottom: 10px;
        border-radius: 50%;

        width: 120px;
        height: 120px;
        border: 1px solid ${colors.primary};
      }
    }

    > div {
      display: flex;
      font-size: 12px;
      font-weight: bold;
      align-items: center;
      justify-content: space-between;
      color: ${colors.title};

      > span {
        font-size: 12px;
        text-align: left;
        margin: 5px 0 10px;
      }

      a {
        color: ${colors.title};

        &:hover {
          color: ${darken(0.03, colors.primary)};
        }
      }

      svg {
        margin-right: 3px;
        text-align: center;
      }
    }

    textarea {
      display: flex;
      box-sizing: border-box;
      border: none;
      border-radius: 3px;
      resize: none;
      padding: 8px
	    box-shadow: 0px 4px 10px -8px black;
      font: 12px 'Roboto', sans-serif;

    }
  }
`;
