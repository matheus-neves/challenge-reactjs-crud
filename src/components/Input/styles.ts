import styled, { css } from 'styled-components';

interface IContainerProps {
  isErrored: boolean;
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;

  & + div {
    margin-top: 24px;

    div {
      margin-top: 0;
    }
  }

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

  label {
    margin-bottom: 2px;
    margin-left: 2px;
    font-size: 14px;
    color: #6c6c80;
  }
  input {
    flex: 1;
    background: transparent;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(240, 240, 245);
    color: #3d3d4d;

    background: #fff;

    border-radius: 8px;
    padding: 18px 24px;
    width: 100%;
    font-size: 16px;

    &::placeholder {
      color: #b7b7cc;
    }

    ${props =>
      props.isFocused &&
      css`
        border-color: #afd69c;
      `};

    ${props =>
      props.isFilled &&
      css`
        border-color: #afd69c;
      `};

    ${props =>
      props.isErrored &&
      css`
        border-color: #ec2f2f;
      `};
  }

  svg {
    margin-right: 16px;
  }
`;

export const TextError = styled.span`
  color: #ec2f2f;
  font-size: 14px;
  font-weight: 500;
  position: absolute;
  left: 6px;
  top: 100%;
`;
