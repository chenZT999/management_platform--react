import React from 'react'
import ReactDOM from 'react-dom/client'

import store from './store/index.ts'
import {Provider} from 'react-redux'
import App from './App'
import './main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)
