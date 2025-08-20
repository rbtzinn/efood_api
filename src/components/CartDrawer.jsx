import React, { useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import { money } from '../utils'

const Steps = {
  CART: 'CART',
  DELIVERY: 'DELIVERY',
  PAYMENT: 'PAYMENT',
  CONFIRM: 'CONFIRM'
}

export default function CartDrawer({ open, onClose }) {
  const { items, inc, dec, remove, total, clear } = useCart()
  const [step, setStep] = useState(Steps.CART)
  const [address, setAddress] = useState({ recebedor: '', endereco: '', cidade: '', cep: '', numero: '', complemento: '' })
  const [payment, setPayment] = useState({ nome: '', numero: '', cvv: '', mes: '', ano: '' })
  const orderId = useMemo(() => Math.random().toString(36).slice(2,10).toUpperCase(), [step === Steps.CONFIRM])

  const canProceedDelivery = items.length > 0
  const canProceedPayment = address.recebedor && address.endereco && address.cidade && address.cep && address.numero
  const canFinish = payment.nome && payment.numero && payment.cvv && payment.mes && payment.ano

  const resetAll = () => {
    clear()
    setStep(Steps.CART)
    setAddress({ recebedor: '', endereco: '', cidade: '', cep: '', numero: '', complemento: '' })
    setPayment({ nome: '', numero: '', cvv: '', mes: '', ano: '' })
  }

  return (
    <div className={"fixed inset-0 z-50 " + (open ? "" : "pointer-events-none")}>
      <div className={"absolute inset-0 bg-black/40 transition " + (open ? "opacity-100" : "opacity-0")} onClick={onClose} />
      <aside className={"absolute top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl transition-transform duration-300 " + (open ? "translate-x-0" : "translate-x-full")}>
        <div className="h-full flex flex-col">
          <header className="p-5 border-b flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {step === Steps.CART && "Carrinho"}
              {step === Steps.DELIVERY && "Entrega"}
              {step === Steps.PAYMENT && "Pagamento"}
              {step === Steps.CONFIRM && "Pedido realizado"}
            </h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </header>

          <div className="flex-1 overflow-y-auto">
            {step === Steps.CART && (
              <div className="p-5 space-y-4">
                {items.length === 0 && <p className="text-gray-600">Seu carrinho está vazio.</p>}
                {items.map((i) => (
                  <div key={i.id} className="flex gap-3 items-center bg-rose-50 rounded-xl p-3">
                    <img src={i.image} className="h-16 w-16 rounded-lg object-cover" alt={i.name} />
                    <div className="flex-1">
                      <div className="font-medium">{i.name}</div>
                      <div className="text-sm text-gray-600">{money(i.price)} • Qtde:
                        <button className="ml-2 px-2 border rounded-lg" onClick={() => dec(i.id)}>-</button>
                        <span className="px-2">{i.qty}</span>
                        <button className="px-2 border rounded-lg" onClick={() => inc(i.id)}>+</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{money(i.price * i.qty)}</div>
                      <button className="text-sm text-red-600" onClick={() => remove(i.id)}>remover</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === Steps.DELIVERY && (
              <form className="p-5 grid grid-cols-1 gap-3">
                <label className="text-sm">Quem irá receber
                  <input className="mt-1 w-full border rounded-lg p-2" value={address.recebedor} onChange={(e)=>setAddress({...address, recebedor:e.target.value})} />
                </label>
                <label className="text-sm">Endereço
                  <input className="mt-1 w-full border rounded-lg p-2" value={address.endereco} onChange={(e)=>setAddress({...address, endereco:e.target.value})} />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm">Cidade
                    <input className="mt-1 w-full border rounded-lg p-2" value={address.cidade} onChange={(e)=>setAddress({...address, cidade:e.target.value})} />
                  </label>
                  <label className="text-sm">CEP
                    <input className="mt-1 w-full border rounded-lg p-2" value={address.cep} onChange={(e)=>setAddress({...address, cep:e.target.value})} />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm">Número
                    <input className="mt-1 w-full border rounded-lg p-2" value={address.numero} onChange={(e)=>setAddress({...address, numero:e.target.value})} />
                  </label>
                  <label className="text-sm">Complemento (opcional)
                    <input className="mt-1 w-full border rounded-lg p-2" value={address.complemento} onChange={(e)=>setAddress({...address, complemento:e.target.value})} />
                  </label>
                </div>
              </form>
            )}

            {step === Steps.PAYMENT && (
              <form className="p-5 grid grid-cols-1 gap-3">
                <label className="text-sm">Nome no cartão
                  <input className="mt-1 w-full border rounded-lg p-2" value={payment.nome} onChange={(e)=>setPayment({...payment, nome:e.target.value})} />
                </label>
                <label className="text-sm">Número do cartão
                  <input className="mt-1 w-full border rounded-lg p-2" value={payment.numero} onChange={(e)=>setPayment({...payment, numero:e.target.value})} />
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <label className="text-sm">CVV
                    <input className="mt-1 w-full border rounded-lg p-2" value={payment.cvv} onChange={(e)=>setPayment({...payment, cvv:e.target.value})} />
                  </label>
                  <label className="text-sm">Mês de vencimento
                    <input className="mt-1 w-full border rounded-lg p-2" value={payment.mes} onChange={(e)=>setPayment({...payment, mes:e.target.value})} />
                  </label>
                  <label className="text-sm">Ano de vencimento
                    <input className="mt-1 w-full border rounded-lg p-2" value={payment.ano} onChange={(e)=>setPayment({...payment, ano:e.target.value})} />
                  </label>
                </div>
              </form>
            )}

            {step === Steps.CONFIRM && (
              <div className="p-6 space-y-3">
                <p className="text-lg">Pedido realizado - <span className="font-semibold">{orderId}</span></p>
                <p className="text-gray-700">Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.</p>
                <p className="text-gray-700">Nossos entregadores não estão autorizados a realizar cobranças extras. Higienize as mãos ao receber seu pedido.</p>
              </div>
            )}
          </div>

          <footer className="p-5 border-t bg-white">
            {step === Steps.CART && (
              <div className="flex items-center justify-between">
                <div className="font-semibold">Valor total {money(total)}</div>
                <button disabled={!canProceedDelivery} className="btn btn-primary disabled:opacity-50" onClick={()=>setStep(Steps.DELIVERY)}>Continuar com a entrega</button>
              </div>
            )}
            {step === Steps.DELIVERY && (
              <div className="flex items-center justify-between">
                <button className="btn" onClick={()=>setStep(Steps.CART)}>Voltar para o carrinho</button>
                <button disabled={!canProceedPayment} className="btn btn-primary disabled:opacity-50" onClick={()=>setStep(Steps.PAYMENT)}>Continuar com o pagamento</button>
              </div>
            )}
            {step === Steps.PAYMENT && (
              <div className="flex items-center justify-between">
                <button className="btn" onClick={()=>setStep(Steps.DELIVERY)}>Voltar para a edição de endereço</button>
                <button disabled={!canFinish} className="btn btn-primary disabled:opacity-50" onClick={()=>{ setStep(Steps.CONFIRM); clear(); }}>Concluir</button>
              </div>
            )}
            {step === Steps.CONFIRM && (
              <div className="flex items-center justify-end">
                <button className="btn btn-primary" onClick={()=>{ onClose(); resetAll(); }}>Fechar</button>
              </div>
            )}
          </footer>
        </div>
      </aside>
    </div>
  )
}
