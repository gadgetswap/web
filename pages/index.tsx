import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer, Header } from '../components'
import { User } from '../graphql/types'
import { withAuth } from '../lib'

interface Props {
  user: User
}

const Home: NextPage<Props> = ({ user }) => {
  return (
    <>
      <Head>
        <title>GadgetSwap</title>
      </Head>

      <Header user={user} />

      <main>
        <h1>GadgetSwap</h1>
        <p>Discover and swap gadgets you don&apos;t want anymore.</p>
      </main>

      <Footer />
    </>
  )
}

Home.getInitialProps = async context => {
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  return {
    user
  }
}

export default Home
