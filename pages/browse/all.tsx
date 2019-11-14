import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import React from 'react'

import { Footer, GadgetPreview, Header, Spinner } from '../../components'
import { Gadget, QueryGadgetsArgs } from '../../types/graphql'

const GET_GADGETS = gql`
  query gadgets {
    gadgets {
      id
      description
      images
      location {
        city
        country
      }
      quantity
      status
      title
      createdAt
    }
  }
`

interface Props {
  token: string
}

const BrowseAll: NextPage<Props> = ({ token }) => {
  const { data, loading } = useQuery<
    {
      gadgets: Gadget[]
    },
    QueryGadgetsArgs
  >(GET_GADGETS)

  return (
    <>
      <Head>
        <title>Browse all / GadgetSwap</title>
      </Head>

      <Header loggedIn={!!token} />

      <main>
        <h1 className="text-5xl font-semibold mb-8">
          <Link href="/browse">
            <a className="hover:text-gray-700">Browse </a>
          </Link>
          / All
        </h1>
        {loading && <Spinner />}
        {data && (
          <section className="flex flex-wrap items-start -m-4">
            {data.gadgets.length === 0 && (
              <div className="text-red-500 m-4">No gadgets found anywhere.</div>
            )}
            {data.gadgets.map((gadget, index) => (
              <GadgetPreview key={index} gadget={gadget} />
            ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}

BrowseAll.getInitialProps = async context => {
  const { token } = parseCookies(context)

  return {
    token
  }
}

export default BrowseAll
