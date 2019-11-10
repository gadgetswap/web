import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../assets/styles'
import { Footer, GadgetPreview, Header, Spinner } from '../../components'
import { Gadget, QueryGadgetsArgs, User } from '../../graphql/types'
import { redirect, withAuth } from '../../lib'

const Main = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: -1em;
`

const Error = styled.div`
  color: ${colors.state.error};
  margin: 0 1em;
`

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
        <h1>Browse / All</h1>
        <Main>
          {loading && <Spinner dark />}
          {data && data.gadgets.length === 0 && (
            <Error>
              <p>No gadgets found anywhere.</p>
            </Error>
          )}
          {data &&
            data.gadgets.map((gadget, index) => (
              <GadgetPreview key={index} gadget={gadget} />
            ))}
        </Main>
      </main>

      <Footer />
    </>
  )
}

BrowseAll.getInitialProps = async context => {
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  if (!user) {
    redirect(context, '/login')
  }

  return {
    user
  }
}

export default BrowseAll
