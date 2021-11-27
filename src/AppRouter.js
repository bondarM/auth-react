import React, { memo } from 'react'
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";
import { useSelector } from 'react-redux';
import { useAppDispatch } from './redux/store';
import { asyncAuth } from './redux/authReducer';
import * as routes from './utils/routes'

export const AppRouter = () => {
  const dispatch = useAppDispatch()
  dispatch(asyncAuth())

  return (
    <BrowserRouter>
      <AppFlow />
    </BrowserRouter>
  )
}

const AppFlow = memo(() => {
  const isAuth = useSelector(state => state.authReducer.isAuth)
  return (
    <Switch>
      {isAuth ?
        <>
          <Route exact={true} path={routes.home} component={UserPage} />
          <Redirect from='*' to='/home' />
        </>
        :
        <>
          <Route exact={true} path={routes.signIn} component={SignIn} />
          <Route exact={true} path={routes.signUp} component={SignUp} />
          <Redirect from='*' to={routes.signIn} />
        </>
      }
    </Switch>
  )
})