import { darken } from 'polished';
import styled, { keyframes, css } from 'styled-components';

import { colors } from '../../styles/colors';

export const Form = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${colors.border};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transfomr: rotate(0deg);
  } to {
    transfomr: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  display: flex;
  align-items: center;
  text-align: center;
  border: none;
  padding: 0 15px;
  background: none;
  margin-left: -40px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    color: ${colors.primary};
    /* ${props =>
    props.loading &&
    css`
        animation: ${rotate} 2s linear infinite;
      `} */
  }
`;

export const List = styled.ul`
  max-width: 700px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  margin-top: 15px;
  justify-content: space-between;

  li {
    display: flex;
    flex-direction: column;
    background: ${colors.background};
    border-radius: 4px;
    padding: 10px;

    img {
      align-items: center;
      max-width: 200px;
      margin: 0 auto;
      border-radius: 50%;

      width: 150px;
      height: 150px;
      border: 1px solid ${colors.primary};
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: ${colors.title};
      margin-top: 5px;
    }

    > span {
      font-size: 12px;
      text-align: left;
      margin: 5px 0 10px;
    }

    > div {
      display: flex;
      margin-top: auto;
      font-size: 14px;
      font-weight: bold;
      align-items: center;
      justify-content: space-between;
      color: ${colors.title};

      a {
        color: ${colors.title};

        &:hover {
          color: ${darken(0.03, colors.primary)};
        }
      }

      svg {
        margin-right: 3px;
      }
    }
  }
`;

export const Loading = styled.div``;
