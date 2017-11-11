import React, {Component}                   from 'react'
import ReactDOM                             from 'react-dom'
import {BrowserRouter, Route, Switch}       from 'react-router-dom'
import {createStore, applyMiddleware}       from 'redux'
import {Provider}                           from 'react-redux'
import thunk                                from 'redux-thunk'

import reducers                             from './redux/rootReducer.js'
import Main                                 from './jsx/main.jsx'
import GithubProcess                        from './jsx/github.jsx'
import Dashboard                            from './jsx/dashboard.jsx'

import './style/index.scss'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Switch>
                <Route path="/callback"            component={GithubProcess} />
                <Route path="/dashboard"            component={Dashboard} />
                <Route path="/"                     component={Main} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById("github-search-app")
)
