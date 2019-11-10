import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../../assets/styles'
import { Footer, GadgetPreview, Header, Spinner } from '../../../components'
import { Gadget, QueryGadgetsArgs, User } from '../../../graphql/types'
import { redirect, withAuth } from '../../../lib'

const Main = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: -1em;
`

const Error = styled.div`
  color: ${colors.state.error};
  margin: 0 1em;

  a {
    color: ${colors.state.message};
  }
`

const GET_GADGETS = gql`
  query gadgets($locationId: ID!) {
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
  user: User
}

const BrowseCity: NextPage<Props> = ({ locationId, user }) => {
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

      <Header user={user} />

      <main>
        <h1>
          Browse / {country} / {city}
        </h1>
        <Main>
          {loading && <Spinner dark />}
          {data && data.gadgets.length === 0 && (
            <Error>
              <p>No gadgets found in your selected location.</p>
              <p>
                <Link href="/browse">
                  <a>Try another?</a>
                </Link>
              </p>
            </Error>
          )}
          {data &&
            data.gadgets.map((gadget, index) => (
              <GadgetPreview key={index} gadget={gadget} hideLocation />
            ))}
        </Main>
      </main>

      <Footer />
    </>
  )
}

BrowseCity.getInitialProps = async context => {
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  if (!user) {
    redirect(context, '/login')
  }

  const { locationId } = parseCookies(context)

  if (!locationId) {
    redirect(context, '/browse')
  }

  return {
    locationId,
    user
  }
}

export default BrowseCity
