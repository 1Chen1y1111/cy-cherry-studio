import './init'
import './i18n'
import './assets/styles/index.scss'
import '@ant-design/v5-patch-for-react-19'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
