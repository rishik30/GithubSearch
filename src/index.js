import React, {Component}                   from 'react'
import ReactDOM                             from 'react-dom'
import {BrowserRouter, Route, Switch}       from 'react-router-dom'
import {createStore, applyMiddleware}       from 'redux'
import {Provider}                           from 'react-redux'
import promiseMiddleware                    from 'redux-promise'

// import reducers                             from './reducers/reducer'
// import MindGame                             from './components/game.jsx'

// import './scss/index.scss'

const createStoreWithMiddleware = applyMiddleware()(createStore)

const Comp = () => {
    return <h1> Github Search </h1>
}

ReactDOM.render(
    // <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Route path="/"                     component={Comp} />
        </BrowserRouter>
    , document.getElementById("github-search-app")
)
