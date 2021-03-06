import React, { Component } from 'react';
import TablePage from './containers/TablePage'

import SetUpScreen from './containers/SetUpScreen'

import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import decReducer,{initialState} from './decReducer'
import uiReducer from './uiReducers'

import Menu from './components/Menu'

import {
  BrowserRouter,
  Route,

} from 'react-router-dom'

const loggerMiddleware = createLogger()

const reducers = {
  dec:decReducer,
  ui:uiReducer
}
export const reducer = combineReducers(reducers);



export const sdStore = createStore(
          reducer,{dec:initialState,ui:{page:"SetUp"}},applyMiddleware(loggerMiddleware)
        )


const pageIndex = {
  "SetUp":<SetUpScreen/>,
  "TablePage":<TablePage/>
}

const {NODE_ENV,PUBLIC_URL} = process.env

const urlPrefix = NODE_ENV === "production"? PUBLIC_URL:""
console.log(urlPrefix)
class App extends Component {
  render() {
    const page =  pageIndex[sdStore.getState().ui.page]

    return (
      <Provider store={sdStore}>
      <BrowserRouter>
        <div>

          <Route exact path = {'/setup'} component = {SetUpScreen}/>
          <Route path = {'/'} component = {TablePage}/>


          {/* <SetUpScreen/> */}
      </div>
      </BrowserRouter>
  </Provider>

    )
  }
}

export default App;
