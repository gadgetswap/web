import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Button, Footer, FormMessage, Header } from '../components'
import { AuthResult, MutationLoginArgs } from '../graphql/types'
import { redirect, withAuth } from '../lib'

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        createdAt
      }
    }
  }
`

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { error, loading }] = useMutation<
    {
      login: AuthResult
    },
    MutationLoginArgs
  >(LOGIN, {
    onCompleted({ login: { token } }) {
      Cookies.set('token', token)

      Router.push('/')
    },
    variables: {
      email,
      password
    }
  })

  return (
    <>
      <Head>
        <title>Login / GadgetSwap</title>
      </Head>

      <Header />

      <main>
        <h1>Login</h1>
        <form
          onSubmit={event => {
            event.preventDefault()

            if (email && password) {
              login()
            }
          }}>
          {error && <FormMessage message={error.message} type="error" />}
          <label>
            <span>Email</span>
            <input
              onChange={event => setEmail(event.target.value)}
              placeholder="Email"
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              onChange={event => setPassword(event.target.value)}
              placeholder="Password"
              required
              type="password"
              value={password}
            />
          </label>
          <Button loading={loading}>Login</Button>
        </form>
      </main>

      <Footer />
    </>
  )
}

Login.getInitialProps = async context => {
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  if (user) {
    redirect(context, '/')
  }

  return {
    user
  }
}

export default Login
