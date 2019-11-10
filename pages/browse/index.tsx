import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../assets/styles'
import { Footer, Header, Spinner } from '../../components'
import { User } from '../../graphql/types'
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
        <h1>Browse</h1>
        {loading && <Spinner dark />}
        <Main>
          <Link href="/browse/all">
            <a>All</a>
          </Link>
          {data &&
            data.countries.map((country, index) => (
              <Link key={index} href={`/browse/${country}`}>
                <a>{country}</a>
              </Link>
            ))}
        </Main>
      </main>

      <Footer />
    </>
  )
}

Browse.getInitialProps = async context => {
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  if (!user) {
    redirect(context, '/login')
  }

  return {
    user
  }
}

export default Browse
