import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const root = window.document.createElement('div')
root.id = 'root'
window.document.body.appendChild(root)

const render = Component => {
  ReactDOM.render(
    <Component/>,
    root
  )
}

render(App)