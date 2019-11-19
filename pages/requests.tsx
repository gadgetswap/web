import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import { Footer, GadgetRequests, Header, Spinner } from '../components'
import { redirect } from '../lib'
import { Gadget, MutationUpdateRequestArgs } from '../types/graphql'

const GET_GADGETS = gql`
  query gadgets {
    gadgets {
      id
      title
      requests {
        id
        description
        status
        user {
          id
          name
        }
        createdAt
      }
      createdAt
    }
  }
`

const UPDATE_REQUEST = gql`
  mutation updateRequest(
    $gadgetId: ID!
    $requestId: ID!
    $status: GadgetRequestStatus!
  ) {
    updateRequest(gadgetId: $gadgetId, requestId: $requestId, status: $status)
  }
`

interface Props {
  token: string
}

const Requests: NextPage<Props> = ({ token }) => {
  const { data, loading } = useQuery<{
    gadgets: Gadget[]
  }>(GET_GADGETS)

  const [updateRequest] = useMutation<{}, MutationUpdateRequestArgs>(
    UPDATE_REQUEST,
    {
      awaitRefetchQueries: true,
      refetchQueries() {
        return [
          {
            query: GET_GADGETS
          }
        ]
      }
    }
  )

  return (
    <>
      <Head>
        <title>Requests / GadgetSwap</title>
      </Head>

      <Header loggedIn={!!token} />

      <main>
        <h1 className="text-5xl font-semibold">Requests</h1>
        {loading && <Spinner />}
        {data && (
          <section>
            {data.gadgets.length === 0 && (
              <div className="text-red-500 my-4">
                You haven&apos;t posted any gadgets yet.
              </div>
            )}
            {data.gadgets.reduce(
              (total, gadget) => (total += gadget.requests.length),
              0
            ) === 0 && (
              <div className="text-red-500 my-4">
                No one has requested your gadgets yet.
              </div>
            )}
            {data.gadgets.map((gadget, index) => (
              <GadgetRequests
                key={index}
                gadget={gadget}
                onUpdate={(gadgetId, requestId, status) =>
                  updateRequest({
                    variables: {
                      gadgetId,
                      requestId,
                      status
                    }
                  })
                }
              />
            ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}

Requests.getInitialProps = async context => {
  const { token } = parseCookies(context)

  if (!token) {
    redirect(context, '/')
  }

  return {
    token
  }
}

export default Requests
