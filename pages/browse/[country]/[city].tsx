import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'

import { Footer, GadgetPreview, Header, Spinner } from '../../../components'
import { redirect } from '../../../lib'
import { Gadget, QueryGadgetsArgs } from '../../../types/graphql'

const GET_GADGETS = gql`
  query gadgets($locationId: ID) {
    gadgets(locationId: $locationId) {
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
  locationId: string
}

const BrowseCity: NextPage<Props> = ({ locationId }) => {
  const {
    query: { city, country }
  } = useRouter()

  const { data, loading } = useQuery<
    {
      gadgets: Gadget[]
    },
    QueryGadgetsArgs
  >(GET_GADGETS, {
    variables: {
      locationId
    }
  })

  return (
    <>
      <Head>
        <title>
          {city} / {country} / Browse / GadgetSwap
        </title>
      </Head>

      <Header />

      <main>
        <h1 className="text-5xl font-semibold mb-8">
          <Link href="/browse">
            <a className="hover:text-gray-700">Browse </a>
          </Link>
          /
          <Link href={`/browse/${country}`}>
            <a className="hover:text-gray-700"> {country} </a>
          </Link>
          / {city}
        </h1>
        {loading && <Spinner />}
        {data && (
          <section className="flex flex-wrap -m-4">
            {data.gadgets.length === 0 && (
              <div className="m-4">
                <p className="text-red-500">
                  No gadgets found in your selected city.
                </p>
                <p className="text-blue-500 mt-4 font-medium">
                  <Link href="/browse">
                    <a>Try another?</a>
                  </Link>
                </p>
              </div>
            )}
            {data.gadgets.map((gadget, index) => (
              <GadgetPreview key={index} gadget={gadget} hideLocation />
            ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}

BrowseCity.getInitialProps = async context => {
  const { locationId } = parseCookies(context)

  if (!locationId) {
    redirect(context, '/browse')
  }

  return {
    locationId
  }
}

export default BrowseCity
