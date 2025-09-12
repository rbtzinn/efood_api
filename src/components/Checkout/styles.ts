import styled from 'styled-components'

export const cores = {
  rosa: '#E66767',
  creme: '#FFEBD9',
  brancofundo: '#FFF8F2'
}

// --- Estilos do Checkout ---

export const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.8);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transition: opacity 0.3s;
  display: flex;
  justify-content: flex-end;
`

export const Aside = styled.aside<{ open: boolean }>`
  height: 100%;
  width: 100%;
  max-width: 360px;
  background: ${cores.rosa};
  color: ${cores.creme};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  padding: 32px 8px;
  overflow-y: auto;
`

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`

export const InputGroup = styled.div`
  margin-bottom: 8px;

  label {
    font-size: 14px;
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
  }

  input {
    background-color: ${cores.creme};
    border: 1px solid ${cores.creme};
    color: #4b4b4b;
    height: 32px;
    padding: 0 8px;
    width: 100%;
  }
`

export const Row = styled.div`
  display: flex;
  gap: 34px;

  & > ${InputGroup} {
    flex: 1;
  }
`

export const ButtonGroup = styled.div`
  margin-top: 24px;
`

export const Button = styled.button`
  background-color: ${cores.creme};
  color: ${cores.rosa};
  border: none;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 0;
  width: 100%;
  cursor: pointer;
  margin-bottom: 8px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ConfirmationText = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 24px;
`

// --- Estilos do Modal de Confirmação ---

export const ModalOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 90; // Z-index maior para ficar sobre o checkout
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transition: opacity 0.3s;
`

export const ModalContent = styled.div`
  background-color: ${cores.creme};
  color: ${cores.rosa};
  padding: 32px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1;

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
`

export const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`

const ModalButtonBase = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
`

export const ModalConfirmButton = styled(ModalButtonBase)`
  background-color: ${cores.rosa};
  color: ${cores.creme};

  &:hover {
    background-color: #c44a4a;
  }
`

export const ModalCancelButton = styled(ModalButtonBase)`
  background-color: transparent;
  color: ${cores.rosa};
  border: 2px solid ${cores.rosa};

  &:hover {
    background-color: rgba(230, 103, 103, 0.1);
  }
`