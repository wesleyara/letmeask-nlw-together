import styled from "styled-components";

export const SCodeButton = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;

  background: #fff;
  border: 1px solid #835afd;
  cursor: pointer;

  display: flex;

  div {
    background-image: linear-gradient(
      64.5deg,
      rgba(245, 116, 185, 1) 14.7%,
      rgba(89, 97, 223, 1) 88.7%
    );
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 16px 0 12px;
    width: 230px;
    font-size: 14px;
    font-weight: 500;
  }
`;
