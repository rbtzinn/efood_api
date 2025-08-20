import React from 'react'
import { money } from '../utils'

export default function ProductCard({ p, onDetails, onAdd }) {
  return (
    <div className="card flex flex-col">
      <img src={p.foto} alt={p.nome} className="h-40 w-full object-cover rounded-xl" />
      <h4 className="mt-3 font-semibold text-lg">{p.nome}</h4>
      <p className="text-sm text-gray-600 mt-1 line-clamp-3">{p.descricao_curta || p.descricao}</p>
      <div className="mt-auto pt-3 grid grid-cols-2 gap-2">
        <button className="btn btn-outline w-full" onClick={() => onDetails(p)}>Mais detalhes</button>
        <button className="btn btn-primary w-full" onClick={() => onAdd(p)}>Adicionar ({money(p.preco)})</button>
      </div>
    </div>
  )
}
