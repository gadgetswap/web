import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../../assets/styles'
import { Footer, Header, Spinner } from '../../../components'
import { withAuth } from '../../../lib'
import { Location, QueryLocationsArgs, User } from '../../../types/graphql'

const Main = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: -1em;

  > a {
    background: ${colors.backgroundDark};
    border-radius: 0.25em;
    padding: 1em;
    margin: 1em;

    &:hover {
      background: ${colors.accent};
    }

    &:active {
      background: ${colors.primary};
      color: ${colors.background};
    }
  }
`

const Error = styled.div`
  color: ${colors.state.error};
  margin: 0 1em;

  a {
    color: ${colors.state.message};
  }
`

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
  user: User
}

const BrowseCountry: NextPage<Props> = ({ user }) => {
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

      <Header user={user} />

      <main>
        <h1>
          <Link href="/browse">
            <a>Browse</a>
          </Link>
          /{country}
        </h1>
        {loading && <Spinner dark />}
        {data && (
          <Main>
            {data.locations.length === 0 && (
              <Error>
                <p>No locations found in your selected country.</p>
                <p>
                  <Link href="/browse">
                    <a>Try another?</a>
                  </Link>
                </p>
              </Error>
            )}
            {data.locations.map(({ city, id }, index) => (
              <Link key={index} href={`/browse/${country}/${city}`}>
                <a
                  onClick={() => {
                    Cookies.set('locationId', id)
                  }}>
                  {city}
                </a>
              </Link>
            ))}
          </Main>
        )}
      </main>

      <Footer />
    </>
  )
}

BrowseCountry.getInitialProps = async context => {
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  return {
    user
  }
}

export default BrowseCountry
