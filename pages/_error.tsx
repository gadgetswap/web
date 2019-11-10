import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer, Header } from '../components'
import { User } from '../graphql/types'
import { withAuth } from '../lib'

interface Props {
  code: number
  user: User
}

const Error: NextPage<Props> = ({ code, user }) => (
  <>
    <Head>
      <title>{code} / GadgetSwap</title>
    </Head>

    <Header user={user} />

    <main>
      <h1>{code}</h1>
      <h3>Holy moly!</h3>
      {code === 404 ? (
        <>
          <p>We can&apos;t find what you were looking for.</p>
          <p>
            The authorities have been informed and we&apos;re looking into it
            right now.
          </p>
        </>
      ) : (
        <p>
          Something terrible happened. Step away from your computer and lock the
          doors.
        </p>
      )}
    </main>

    <Footer />
  </>
)

// @ts-ignore
Error.getInitialProps = async ({ apolloClient, res, err }) => {
  const user = await withAuth(apolloClient)

  const code = res ? res.statusCode : err ? err.statusCode : 404

  return {
    code,
    user
  }
}

export default Error
