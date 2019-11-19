import { useMutation, useQuery } from '@apollo/react-hooks'
import clsx from 'clsx'
import gql from 'graphql-tag'
import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'

import { Footer, Header, Spinner } from '../../components'
import { redirect } from '../../lib'
import {
  Gadget,
  GadgetStatus,
  MutationDeleteGadgetArgs
} from '../../types/graphql'

const GET_GADGETS = gql`
  query gadgetsByUser {
    gadgetsByUser {
      id
      status
      title
      createdAt
    }
  }
`

const DELETE_GADGET = gql`
  mutation deleteGadget($gadgetId: ID!) {
    deleteGadget(gadgetId: $gadgetId)
  }
`

interface Props {
  token: string
}

const Gadgets: NextPage<Props> = ({ token }) => {
  const [deleting, setLoading] = useState<Map<string, boolean>>(new Map())

  const updateLoading = (gadgetId: string, isLoading: boolean) => {
    const copy = new Map(deleting)

    if (isLoading) {
      copy.set(gadgetId, isLoading)
    } else {
      copy.delete(gadgetId)
    }

    setLoading(copy)
  }

  const { data, loading } = useQuery<{
    gadgetsByUser: Gadget[]
  }>(GET_GADGETS)

  const [deleteGadget] = useMutation<{}, MutationDeleteGadgetArgs>(
    DELETE_GADGET,
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
        <title>Your gadgets / GadgetSwap</title>
      </Head>

      <Header loggedIn={!!token} />

      <main>
        <h1 className="text-5xl font-semibold mb-8">Your gadgets</h1>
        {loading && <Spinner />}
        {data && (
          <section className="overflow-x-auto">
            {data.gadgetsByUser.length === 0 && (
              <div className="text-red-500">
                You haven&apos;t posted any gadgets yet.
              </div>
            )}
            {data.gadgetsByUser.length > 0 && (
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Posted</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data.gadgetsByUser.map(
                    ({ createdAt, id, status, title }, index) => (
                      <tr key={index}>
                        <td className="whitespace-no-wrap md:whitespace-normal">
                          <Link href={`/gadgets/${id}`}>
                            <a className="text-blue-500">{title}</a>
                          </Link>
                        </td>
                        <td>
                          <span
                            className={clsx(
                              'font-semibold',
                              'px-4',
                              'py-2',
                              'rounded-full',
                              'text-sm',
                              'text-white',

                              status === GadgetStatus.Available
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            )}>
                            {status}
                          </span>
                        </td>
                        <td
                          className="whitespace-no-wrap md:whitespace-normal"
                          title={moment(createdAt).format('LLLL')}>
                          {moment(createdAt).fromNow()}
                        </td>
                        <td className="text-right">
                          {deleting.get(id) && <Spinner />}
                          {!deleting.get(id) &&
                            status === GadgetStatus.Available && (
                              <a
                                className="text-red-500"
                                href="#delete"
                                onClick={async event => {
                                  event.preventDefault()

                                  const yes = window.confirm(
                                    `Are you sure you want to delete ${title}?`
                                  )

                                  if (yes) {
                                    try {
                                      updateLoading(id, true)

                                      await deleteGadget({
                                        variables: {
                                          gadgetId: id
                                        }
                                      })
                                    } finally {
                                      updateLoading(id, false)
                                    }
                                  }
                                }}>
                                Delete
                              </a>
                            )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}

Gadgets.getInitialProps = async context => {
  const { token } = parseCookies(context)

  if (!token) {
    redirect(context, '/')
  }

  return {
    token
  }
}

export default Gadgets
