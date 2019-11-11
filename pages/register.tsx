import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Button, Footer, FormMessage, Header } from '../components'
import { AuthResult, MutationRegisterArgs } from '../graphql/types'
import { redirect, withAuth } from '../lib'

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
      Cookies.set('token', token)

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
        <title>Register / GadgetSwap</title>
      </Head>

      <Header />

      <main>
        <h1>Register</h1>
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
          <Button loading={loading}>Register</Button>
        </form>
      </main>

      <Footer />
    </>
  )
}

Register.getInitialProps = async context => {
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  if (user) {
    redirect(context, '/')
  }

  return {
    user
  }
}

export default Register
