import styled from "styled-components";

const cores = {
  rosa: '#E66767',
  creme: '#FFEBD9'
}

export const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 90; // Um z-index alto para ficar acima de outros modais
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.3s;
`;

export const ModalContent = styled.div`
  background-color: ${cores.creme};
  color: ${cores.rosa};
  padding: 32px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 24px;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 32px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const ConfirmButton = styled.button`
  background-color: ${cores.rosa};
  color: ${cores.creme};
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d15656;
  }
`;

export const CancelButton = styled.button`
  background-color: transparent;
  color: ${cores.rosa};
  border: 1px solid ${cores.rosa};
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${cores.rosa};
    color: ${cores.creme};
  }
`;