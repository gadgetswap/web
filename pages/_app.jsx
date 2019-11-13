import '../assets/global.scss'

import { ApolloProvider } from '@apollo/react-hooks'
import App from 'next/app'
import React from 'react'

import { AuthProvider } from '../hooks'
import { withApollo } from '../lib'

class GadgetSwap extends App {
  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <ApolloProvider client={apollo}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    )
  }
}

export default withApollo(GadgetSwap)
