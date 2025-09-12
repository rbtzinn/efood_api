import React, { useState, useMemo } from 'react'
import { useCart } from '../../context/CartContext'
import { money } from '../../utils'
import {
  Overlay,
  Aside,
  Title,
  InputGroup,
  Row,
  ButtonGroup,
  Button,
  ConfirmationText,
  // Estilos do novo modal importados
  ModalOverlay,
  ModalContent,
  ModalButtonGroup,
  ModalConfirmButton,
  ModalCancelButton
} from './styles'

type ConfirmationModalProps = {
  open: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar'
}) => {
  if (!open) return null

  return (
    <ModalOverlay open={open}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <ModalButtonGroup>
          <ModalConfirmButton onClick={onConfirm}>{confirmText}</ModalConfirmButton>
          <ModalCancelButton onClick={onCancel}>{cancelText}</ModalCancelButton>
        </ModalButtonGroup>
      </ModalContent>
    </ModalOverlay>
  )
}

// --- Componente Principal de Checkout ---

const Steps = {
  DELIVERY: 'DELIVERY',
  PAYMENT: 'PAYMENT',
  CONFIRM: 'CONFIRM'
} as const

type Step = typeof Steps[keyof typeof Steps]

type Props = {
  open: boolean
  onClose: () => void
}

export default function Checkout({ open, onClose }: Props) {
  const { items, total, clear } = useCart()
  const [step, setStep] = useState<Step>(Steps.DELIVERY)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false) // Estado para controlar o modal
  const [address, setAddress] = useState({
    receiver: '',
    address: '',
    city: '',
    zipCode: '',
    number: '',
    complement: ''
  })
  const [payment, setPayment] = useState({
    cardName: '',
    cardNumber: '',
    cardCode: '',
    expiresMonth: '',
    expiresYear: ''
  })

  const orderId = useMemo(
    () => Math.random().toString(36).slice(2, 10).toUpperCase(),
    [step === Steps.CONFIRM]
  )

  const canProceedPayment =
    address.receiver &&
    address.address &&
    address.city &&
    address.zipCode &&
    address.number

  const canFinish =
    payment.cardName &&
    payment.cardNumber &&
    payment.cardCode &&
    payment.expiresMonth &&
    payment.expiresYear

  const resetAll = () => {
    clear()
    setAddress({ receiver: '', address: '', city: '', zipCode: '', number: '', complement: '' })
    setPayment({ cardName: '', cardNumber: '', cardCode: '', expiresMonth: '', expiresYear: '' })
    setStep(Steps.DELIVERY)
    onClose()
  }

  // Novas funções para controlar o modal
  const handleOverlayClick = () => {
    setConfirmModalOpen(true)
  }

  const handleConfirmExit = () => {
    setConfirmModalOpen(false)
    resetAll()
  }

  const handleCancelExit = () => {
    setConfirmModalOpen(false)
  }

  if (!open) return null;

  return (
    <>
      <Overlay open={open} onClick={handleOverlayClick}>
        <Aside open={open} onClick={(e) => e.stopPropagation()}>
          {step === Steps.DELIVERY && (
            <form>
              <Title>Entrega</Title>
              <InputGroup>
                <label htmlFor="receiver">Quem irá receber</label>
                <input id="receiver" type="text" value={address.receiver} onChange={e => setAddress({...address, receiver: e.target.value})} />
              </InputGroup>
              <InputGroup>
                <label htmlFor="address">Endereço</label>
                <input id="address" type="text" value={address.address} onChange={e => setAddress({...address, address: e.target.value})} />
              </InputGroup>
              <InputGroup>
                <label htmlFor="city">Cidade</label>
                <input id="city" type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
              </InputGroup>
              <Row>
                <InputGroup>
                  <label htmlFor="zipCode">CEP</label>
                  <input id="zipCode" type="text" value={address.zipCode} onChange={e => setAddress({...address, zipCode: e.target.value})} />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="number">Número</label>
                  <input id="number" type="text" value={address.number} onChange={e => setAddress({...address, number: e.target.value})} />
                </InputGroup>
              </Row>
              <InputGroup>
                <label htmlFor="complement">Complemento (opcional)</label>
                <input id="complement" type="text" value={address.complement} onChange={e => setAddress({...address, complement: e.target.value})} />
              </InputGroup>
              <ButtonGroup>
                <Button type="button" onClick={() => setStep(Steps.PAYMENT)} disabled={!canProceedPayment}>
                  Continuar com o pagamento
                </Button>
                <Button type="button" onClick={onClose}>Voltar para o carrinho</Button>
              </ButtonGroup>
            </form>
          )}

          {step === Steps.PAYMENT && (
            <form>
              <Title>Pagamento - Valor a pagar {money(total)}</Title>
              <InputGroup>
                <label htmlFor="cardName">Nome no cartão</label>
                <input id="cardName" type="text" value={payment.cardName} onChange={e => setPayment({...payment, cardName: e.target.value})} />
              </InputGroup>
              <Row>
                <InputGroup>
                  <label htmlFor="cardNumber">Número do cartão</label>
                  <input id="cardNumber" type="text" value={payment.cardNumber} onChange={e => setPayment({...payment, cardNumber: e.target.value})} />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cardCode">CVV</label>
                  <input id="cardCode" type="text" value={payment.cardCode} onChange={e => setPayment({...payment, cardCode: e.target.value})} />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <label htmlFor="expiresMonth">Mês de vencimento</label>
                  <input id="expiresMonth" type="text" value={payment.expiresMonth} onChange={e => setPayment({...payment, expiresMonth: e.target.value})} />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="expiresYear">Ano de vencimento</label>
                  <input id="expiresYear" type="text" value={payment.expiresYear} onChange={e => setPayment({...payment, expiresYear: e.target.value})} />
                </InputGroup>
              </Row>
              <ButtonGroup>
                <Button type="button" onClick={() => setStep(Steps.CONFIRM)} disabled={!canFinish}>Finalizar pagamento</Button>
                <Button type="button" onClick={() => setStep(Steps.DELIVERY)}>Voltar para a edição de endereço</Button>
              </ButtonGroup>
            </form>
          )}

          {step === Steps.CONFIRM && (
            <div>
              <Title>Pedido realizado - {orderId}</Title>
              <ConfirmationText>
                Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.
              </ConfirmationText>
              <ConfirmationText>
                Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras.
              </ConfirmationText>
              <ConfirmationText>
                Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar durante a refeição.
              </ConfirmationText>
              <ConfirmationText>
                Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!
              </ConfirmationText>
              <ButtonGroup>
                <Button onClick={resetAll}>Concluir</Button>
              </ButtonGroup>
            </div>
          )}
        </Aside>
      </Overlay>

      <ConfirmationModal
        open={isConfirmModalOpen}
        title="Deseja sair do checkout?"
        message="Se você sair agora, todas as informações preenchidas serão perdidas."
        confirmText="Sair mesmo assim"
        cancelText="Continuar preenchendo"
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />
    </>
  )
}