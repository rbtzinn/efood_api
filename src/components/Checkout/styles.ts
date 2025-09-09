import styled from 'styled-components'

const cores = {
  rosa: '#E66767',
  creme: '#FFEBD9',
  brancofundo: '#FFF8F2'
}

export const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0,0,0,0.8);
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
  box-shadow: -2px 0 8px rgba(0,0,0,0.1);
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  padding: 32px 8px;
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
    height: 32px;
    padding: 0 8px;
    width: 100%;
    
    &.error {
      border: 1px solid red;
    }
  }
`

export const Row = styled.div`
  display: flex;
  gap: 34px;
  
  ${InputGroup} {
    flex: 1;
  }
`

export const ButtonGroup = styled.div`
  margin-top: 24px;
`

export const Button = styled.button`
  width: 100%;
  padding: 4px 0;
  border-radius: 4px;
  background: ${cores.creme};
  color: ${cores.rosa};
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-bottom: 8px;

  &:hover {
    background: #fdf7f0;
  }
`

export const ConfirmationText = styled.p`
  font-size: 14px;
  line-height: 22px;
`
