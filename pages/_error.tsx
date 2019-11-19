import { NextPage } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import { Footer, Header } from '../components'

interface Props {
  code: number
  token: string
}

const Error: NextPage<Props> = ({ code, token }) => (
  <>
    <Head>
      <title>{code || 'Error'} / GadgetSwap</title>
    </Head>

    <Header loggedIn={!!token} />

    <main>
      <h1 className="text-5xl font-semibold mb-8">{code || 'Error'}</h1>
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
Error.getInitialProps = async context => {
  const { token } = parseCookies(context)

  const { err, res } = context

  const code = res ? res.statusCode : err ? err.statusCode || 500 : 404

  return {
    code,
    token
  }
}

export default Error
