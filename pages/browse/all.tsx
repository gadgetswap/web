import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import { Footer, GadgetPreview, Header, Spinner } from '../../components'
import { withAuth } from '../../lib'
import { Gadget, QueryGadgetsArgs, User } from '../../types/graphql'

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
  user: User
}

const BrowseAll: NextPage<Props> = ({ user }) => {
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

      <Header user={user} />

      <main>
        <h1 className="text-5xl font-semibold mb-8">
          <Link href="/browse">
            <a className="hover:text-gray-700">Browse</a>
          </Link>
          / All
        </h1>
        {loading && <Spinner />}
        {data && (
          <section className="flex flex-wrap -m-4">
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
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  return {
    user
  }
}

export default BrowseAll
