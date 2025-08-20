import React from 'react'

export default function RestaurantCard({ r, onOpen }) {
  return (
    <div className="card hover:shadow-lg transition flex flex-col">
      <img src={r.capa} alt={r.titulo} className="h-40 w-full object-cover rounded-xl" />
      <div className="mt-3 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <span className="badge">{r.tipo}</span>
          <span className="text-sm font-semibold">⭐ {r.avaliacao?.toFixed?.(1) ?? r.avaliacao}</span>
        </div>
        <h3 className="mt-2 font-bold text-lg">{r.titulo}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{r.descricao}</p>
        <div className="mt-auto pt-3">
          <button className="btn btn-primary w-full" onClick={() => onOpen(r)}>Saiba mais</button>
        </div>
      </div>
    </div>
  )
}
