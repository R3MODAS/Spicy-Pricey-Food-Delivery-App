import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./css/index.css"
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from './utils/appStore.js'
import ScrolltoTop from './utils/ScrolltoTop.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <Router>
      <React.StrictMode>
        <ScrolltoTop />
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
)
