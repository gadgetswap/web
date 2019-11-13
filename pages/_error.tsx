import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Footer, Header } from '../components'
import { withAuth } from '../lib'
import { User } from '../types/graphql'

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
      <h1 className="text-5xl font-semibold mb-8">{code}</h1>
      <h3 className="text-3xl font-semibold">Holy moly!</h3>
      {code === 404 ? (
        <>
          <p className="mt-4">We can&apos;t find what you were looking for.</p>
          <p className="mt-4">
            The authorities have been informed and we&apos;re looking into it
            right now.
          </p>
        </>
      ) : (
        <p className="mt-4">
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
