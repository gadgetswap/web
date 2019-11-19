import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import { Footer, GadgetRequests, Header, Spinner } from '../components'
import { redirect } from '../lib'
import { Gadget } from '../types/graphql'

const GET_GADGETS = gql`
  query gadgets {
    gadgets {
      id
      title
      requests {
        id
        description
        status
        user {
          id
          name
        }
        createdAt
      }
      createdAt
    }
  }
`

interface Props {
  token: string
}

const Requests: NextPage<Props> = ({ token }) => {
  const { data, loading } = useQuery<{
    gadgets: Gadget[]
  }>(GET_GADGETS)

  return (
    <>
      <Head>
        <title>Requests / GadgetSwap</title>
      </Head>

      <Header loggedIn={!!token} />

      <main>
        <h1 className="text-5xl font-semibold">Requests</h1>
        {loading && <Spinner />}
        {data && (
          <section>
            {data.gadgets.length === 0 && (
              <div className="text-red-500 m-4">
                You haven&apos;t posted any gadgets yet.
              </div>
            )}
            {data.gadgets.map((gadget, index) => (
              <GadgetRequests key={index} gadget={gadget} />
            ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}

Requests.getInitialProps = async context => {
  const { token } = parseCookies(context)

  if (!token) {
    redirect(context, '/')
  }

  return {
    token
  }
}

export default Requests
