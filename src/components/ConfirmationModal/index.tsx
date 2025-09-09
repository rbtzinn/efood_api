import React from 'react';
import {
  Overlay,
  ModalContent,
  ButtonGroup,
  ConfirmButton,
  CancelButton
} from './styles';
import { Produto } from '../../types/api'; 

type Props = {
  open: boolean;
  productName: string;
  currentQuantity: number;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<Props> = ({
  open,
  productName,
  currentQuantity,
  onConfirm,
  onCancel
}) => {
  return (
    <Overlay open={open}>
      <ModalContent>
        <h3>Confirmar adição</h3>
        <p>
          Você já tem <strong>{currentQuantity} unidade(s)</strong> de{' '}
          <strong>{productName}</strong> no carrinho.
          <br /> Deseja adicionar mais uma?
        </p>
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm}>Sim, adicionar</ConfirmButton>
          <CancelButton onClick={onCancel}>Não, obrigado</CancelButton>
        </ButtonGroup>
      </ModalContent>
    </Overlay>
  );
};

export default ConfirmationModal;