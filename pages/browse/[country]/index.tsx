import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'

import { Footer, Header, Spinner } from '../../../components'
import { Location, QueryLocationsArgs } from '../../../types/graphql'

const GET_LOCATIONS = gql`
  query locations($country: String!) {
    locations(country: $country) {
      id
      city
      country
    }
  }
`

interface Props {
  token: string
}

const BrowseCountry: NextPage<Props> = ({ token }) => {
  const { query } = useRouter()

  const country = query.country as string

  const { data, loading } = useQuery<
    {
      locations: Location[]
    },
    QueryLocationsArgs
  >(GET_LOCATIONS, {
    variables: {
      country
    }
  })

  return (
    <>
      <Head>
        <title>{country} / Browse / GadgetSwap</title>
      </Head>

      <Header loggedIn={!!token} />

      <main>
        <h1 className="text-5xl font-semibold mb-8">
          <Link href="/browse">
            <a className="hover:text-gray-700">Browse </a>
          </Link>
          / {country}
        </h1>
        {loading && <Spinner />}
        {data && (
          <section className="flex flex-wrap -m-4">
            {data.locations.length === 0 && (
              <div className="m-4">
                <p className="text-red-500">
                  No cities found in your selected country.
                </p>
                <p className="text-blue-500 mt-4 font-medium">
                  <Link href="/browse">
                    <a>Try another?</a>
                  </Link>
                </p>
              </div>
            )}
            {data.locations.map(({ city, id }, index) => (
              <Link key={index} href={`/browse/${country}/${city}`}>
                <a
                  className="bg-gray-200 rounded m-4 p-4 hover:bg-accent"
                  onClick={() => Cookies.set('locationId', id)}>
                  {city}
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

BrowseCountry.getInitialProps = async context => {
  const { token } = parseCookies(context)

  return {
    token
  }
}

export default BrowseCountry
