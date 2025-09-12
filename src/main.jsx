import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App' // Assumindo que App.jsx foi renomeado para App.tsx
import './index.css'

// Ponto de entrada do React
const container = document.getElementById('root')

// Verificação para garantir que o container existe (boa prática em TypeScript)
if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

