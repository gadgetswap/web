import '../assets/global.scss'

import { ApolloProvider } from '@apollo/react-hooks'
import App from 'next/app'
import React from 'react'

import { withApollo } from '../lib'

class GadgetSwap extends App {
  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withApollo(GadgetSwap)
