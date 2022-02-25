import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import TransactionProvider from './context/TransactionContext'
import { NotificationProvider } from "./notify/NotificationContext";

ReactDOM.render(
  <NotificationProvider>
    <TransactionProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
    </TransactionProvider>
  </NotificationProvider>,
  document.getElementById('root')
)
