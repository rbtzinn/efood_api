import React, { useState } from 'react'
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
  ModalOverlay,
  ModalContent,
  ModalButtonGroup,
  ModalConfirmButton,
  ModalCancelButton
} from './styles'

// Define the type for the API response
type OrderResponse = {
  orderId: string;
}

// --- Componente do Modal de Confirmação ---
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
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)
  
  // State for API interaction
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(null);

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
    payment.expiresYear &&
    payment.cardNumber.length >= 13 &&
    payment.cardCode.length >= 3

  const resetAll = () => {
    clear()
    setAddress({ receiver: '', address: '', city: '', zipCode: '', number: '', complement: '' })
    setPayment({ cardName: '', cardNumber: '', cardCode: '', expiresMonth: '', expiresYear: '' })
    setStep(Steps.DELIVERY)
    setOrderResponse(null);
    setApiError('');
    onClose()
  }

  const handleOverlayClick = () => {
    if (step !== Steps.CONFIRM) {
      setConfirmModalOpen(true)
    }
  }

  const handleConfirmExit = () => {
    setConfirmModalOpen(false)
    resetAll()
  }

  const handleCancelExit = () => {
    setConfirmModalOpen(false)
  }

  // Função para fazer o POST para a API
  const handleFinishPayment = async () => {
    setIsSubmitting(true);
    setApiError('');

    const payload = {
      products: items.map(item => ({
        id: item.id,
        price: item.price
      })),
      delivery: {
        receiver: address.receiver,
        address: {
          description: address.address,
          city: address.city,
          zipCode: address.zipCode,
          number: parseInt(address.number, 10),
          complement: address.complement
        }
      },
      payment: {
        card: {
          name: payment.cardName,
          number: payment.cardNumber,
          code: parseInt(payment.cardCode, 10),
          expires: {
            month: parseInt(payment.expiresMonth, 10),
            year: parseInt(payment.expiresYear, 10)
          }
        }
      }
    };

    try {
      const response = await fetch('https://ebac-fake-api.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Houve um erro ao processar seu pedido. Por favor, tente novamente.');
      }

      const data: OrderResponse = await response.json();
      setOrderResponse(data);
      setStep(Steps.CONFIRM);
      clear(); // Limpa o carrinho após a confirmação do pedido

    } catch (error: any) {
      setApiError(error.message || 'Não foi possível conectar ao servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!open) return null;

  return (
    <>
      <Overlay open={open} onClick={handleOverlayClick}>
        <Aside open={open} onClick={(e) => e.stopPropagation()}>
          {step === Steps.DELIVERY && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(Steps.PAYMENT); }}>
              <Title>Entrega</Title>
              <InputGroup>
                <label htmlFor="receiver">Quem irá receber</label>
                <input id="receiver" type="text" value={address.receiver} onChange={e => setAddress({...address, receiver: e.target.value})} required />
              </InputGroup>
              <InputGroup>
                <label htmlFor="address">Endereço</label>
                <input id="address" type="text" value={address.address} onChange={e => setAddress({...address, address: e.target.value})} required />
              </InputGroup>
              <InputGroup>
                <label htmlFor="city">Cidade</label>
                <input id="city" type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} required />
              </InputGroup>
              <Row>
                <InputGroup>
                  <label htmlFor="zipCode">CEP</label>
                  <input id="zipCode" type="text" value={address.zipCode} onChange={e => setAddress({...address, zipCode: e.target.value})} required />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="number">Número</label>
                  <input id="number" type="text" value={address.number} onChange={e => setAddress({...address, number: e.target.value})} required />
                </InputGroup>
              </Row>
              <InputGroup>
                <label htmlFor="complement">Complemento (opcional)</label>
                <input id="complement" type="text" value={address.complement} onChange={e => setAddress({...address, complement: e.target.value})} />
              </InputGroup>
              <ButtonGroup>
                <Button type="submit" disabled={!canProceedPayment}>
                  Continuar com o pagamento
                </Button>
                <Button type="button" onClick={onClose}>Voltar para o carrinho</Button>
              </ButtonGroup>
            </form>
          )}

          {step === Steps.PAYMENT && (
            <form onSubmit={(e) => { e.preventDefault(); handleFinishPayment(); }}>
              <Title>Pagamento - Valor a pagar {money(total)}</Title>
              <InputGroup>
                <label htmlFor="cardName">Nome no cartão</label>
                <input id="cardName" type="text" value={payment.cardName} onChange={e => setPayment({...payment, cardName: e.target.value})} required />
              </InputGroup>
              <Row>
                <InputGroup>
                  <label htmlFor="cardNumber">Número do cartão</label>
                  <input id="cardNumber" type="text" value={payment.cardNumber} onChange={e => setPayment({...payment, cardNumber: e.target.value})} required minLength={13} maxLength={19} />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cardCode">CVV</label>
                  <input id="cardCode" type="text" value={payment.cardCode} onChange={e => setPayment({...payment, cardCode: e.target.value})} required minLength={3} maxLength={4} />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <label htmlFor="expiresMonth">Mês de vencimento</label>
                  <input id="expiresMonth" type="text" value={payment.expiresMonth} onChange={e => setPayment({...payment, expiresMonth: e.target.value})} required minLength={1} maxLength={2} />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="expiresYear">Ano de vencimento</label>
                  <input id="expiresYear" type="text" value={payment.expiresYear} onChange={e => setPayment({...payment, expiresYear: e.target.value})} required minLength={4} maxLength={4} />
                </InputGroup>
              </Row>
              {apiError && <p style={{ color: 'yellow', marginTop: '16px' }}>{apiError}</p>}
              <ButtonGroup>
                <Button type="submit" disabled={!canFinish || isSubmitting}>
                  {isSubmitting ? 'Finalizando...' : 'Finalizar pagamento'}
                </Button>
                <Button type="button" onClick={() => setStep(Steps.DELIVERY)}>Voltar para a edição de endereço</Button>
              </ButtonGroup>
            </form>
          )}

          {step === Steps.CONFIRM && orderResponse && (
            <div>
              <Title>Pedido realizado - {orderResponse.orderId}</Title>
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