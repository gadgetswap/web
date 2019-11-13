import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import { Footer, Header, Spinner } from '../../components'
import { withAuth } from '../../lib'
import { User } from '../../types/graphql'

const GET_COUNTRIES = gql`
  query countries {
    countries
  }
`

interface Props {
  user: User
}

const Browse: NextPage<Props> = ({ user }) => {
  const { data, loading } = useQuery<{
    countries: string[]
  }>(GET_COUNTRIES)

  return (
    <>
      <Head>
        <title>Browse / GadgetSwap</title>
      </Head>

      <Header user={user} />

      <main>
        <h1 className="text-5xl font-semibold mb-8">Browse</h1>
        {loading && <Spinner />}
        {data && (
          <section className="flex flex-wrap -m-4">
            <Link href="/browse/all">
              <a className="bg-gray-200 rounded m-4 p-4 hover:bg-accent">All</a>
            </Link>
            {data.countries.map((country, index) => (
              <Link key={index} href={`/browse/${country}`}>
                <a className="bg-gray-200 rounded m-4 p-4 hover:bg-accent">
                  {country}
                </a>
              </Link>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}

Browse.getInitialProps = async context => {
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  return {
    user
  }
}

export default Browse
