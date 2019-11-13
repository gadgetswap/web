import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import { Footer, Header, Spinner } from '../../components'

const GET_COUNTRIES = gql`
  query countries {
    countries
  }
`

const Browse: NextPage = () => {
  const { data, loading } = useQuery<{
    countries: string[]
  }>(GET_COUNTRIES)

  return (
    <>
      <Head>
        <title>Browse / GadgetSwap</title>
      </Head>

      <Header />

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

export default Browse
