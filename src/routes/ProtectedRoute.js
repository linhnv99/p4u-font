import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import DefaultLayout from "../components/Layout/DefaultLayout";
import Router from './router'
import Auth from '../api/auth'

const ProtectedRoute = ({
  component: Component,
  redirect,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={routerProps => {
        const props = { ...rest, ...routerProps }
        if (Auth.getToken() && redirect === Router.login) {
          return (
            <DefaultLayout {...props}>
              <Component {...props} />
            </DefaultLayout>
          )
        }
        return <Redirect to={redirect} />
      }}
    />
  )
}

export default ProtectedRoute
