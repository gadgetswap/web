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
import { AuthResult, MutationRegisterArgs } from '../types/graphql'

const REGISTER = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
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

const Register: NextPage = () => {
  const auth = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [register, { error, loading }] = useMutation<
    {
      register: AuthResult
    },
    MutationRegisterArgs
  >(REGISTER, {
    onCompleted({ register: { token } }) {
      auth.login(token)

      Router.push('/')
    },
    variables: {
      email,
      name,
      password
    }
  })

  return (
    <>
      <Head>
        <title>Sign up / GadgetSwap</title>
      </Head>

      <Header />

      <main>
        <h1 className="text-5xl font-semibold">Sign up</h1>
        <form
          onSubmit={event => {
            event.preventDefault()

            if (name && email && password) {
              register()
            }
          }}>
          {error && <FormMessage message={error.message} type="error" />}
          <label>
            <span>Name</span>
            <input
              onChange={event => setName(event.target.value)}
              placeholder="Name"
              required
              type="name"
              value={name}
            />
          </label>
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
          {loading ? <Spinner /> : <button>Sign up</button>}
        </form>
      </main>

      <Footer />
    </>
  )
}

Register.getInitialProps = async context => {
  const { token } = parseCookies(context)

  if (token) {
    redirect(context, '/')
  }

  return {
    token
  }
}

export default Register
