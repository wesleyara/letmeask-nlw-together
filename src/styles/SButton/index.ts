import styled from "styled-components";

export const SButton = styled.button`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: linear-gradient(
    64.5deg,
    rgba(245, 116, 185, 1) 14.7%,
    rgba(89, 97, 223, 1) 88.7%
  );
  color: #fff;
  padding: 0 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 8px;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
