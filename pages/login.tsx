import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'

import { Footer, FormMessage, Header, Spinner } from '../components'
import { useAuth } from '../hooks'
import { redirect } from '../lib'
import { AuthResult, MutationLoginArgs } from '../types/graphql'

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
  const auth = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { error, loading }] = useMutation<
    {
      login: AuthResult
    },
    MutationLoginArgs
  >(LOGIN, {
    onCompleted({ login: { token } }) {
      auth.login(token)

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
        <title>Sign in / GadgetSwap</title>
      </Head>

      <Header />

      <main>
        <h1 className="text-5xl font-semibold">Sign in</h1>
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
          {loading ? <Spinner /> : <button>Sign in</button>}
        </form>
      </main>

      <Footer />
    </>
  )
}

Login.getInitialProps = async context => {
  const { token } = parseCookies(context)

  if (token) {
    redirect(context, '/')
  }

  return {
    token
  }
}

export default Login
