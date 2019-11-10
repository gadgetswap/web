import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../assets/styles'
import { Footer, Header, Spinner } from '../../components'
import { Location, QueryLocationsArgs, User } from '../../graphql/types'
import { redirect, withAuth } from '../../lib'

const Main = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: -1em;

  a {
    background: ${colors.backgroundDark};
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
        <title>Browse / GadgetSwap</title>
      </Head>

      <Header user={user} />

      <main>
        <h1>Browse / {country}</h1>
        <Main>
          {loading && <Spinner dark />}
          {data &&
            data.locations.map(({ city }, index) => (
              <Link key={index} href={`/browse/${country}/${city}`}>
                <a>{city}</a>
              </Link>
            ))}
        </Main>
      </main>

      <Footer />
    </>
  )
}

BrowseCountry.getInitialProps = async context => {
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  if (!user) {
    redirect(context, '/login')
  }

  return {
    user
  }
}

export default BrowseCountry
