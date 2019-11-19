import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'

import {
  CommentForm,
  Footer,
  GadgetComments,
  GadgetDetails,
  Header,
  Spinner
} from '../../components'
import {
  Comment,
  Gadget,
  GadgetRequest,
  MutationCreateCommentArgs,
  MutationCreateRequestArgs,
  QueryGadgetArgs
} from '../../types/graphql'

const GET_GADGET = gql`
  query gadget($gadgetId: ID!) {
    gadget(gadgetId: $gadgetId) {
      id
      description
      images
      location {
        city
        country
      }
      quantity
      isRequested
      status
      title
      user {
        id
        name
      }
      createdAt
    }
  }
`

const GET_COMMENTS = gql`
  query gadgetComments($gadgetId: ID!) {
    gadgetComments(gadgetId: $gadgetId) {
      id
      body
      user {
        id
        name
      }
      createdAt
    }
  }
`

const CREATE_COMMENT = gql`
  mutation createComment($body: String!, $gadgetId: ID!) {
    createComment(body: $body, gadgetId: $gadgetId) {
      id
    }
  }
`

const REQUEST_GADGET = gql`
  mutation createRequest($gadgetId: ID!, $description: String!) {
    createRequest(gadgetId: $gadgetId, description: $description) {
      id
    }
  }
`

interface Props {
  token: string
  userId: string
}

const GadgetById: NextPage<Props> = ({ token, userId }) => {
  const {
    query: { id }
  } = useRouter()

  const gadgetId = id as string

  const gadgetQuery = useQuery<
    {
      gadget: Gadget
    },
    QueryGadgetArgs
  >(GET_GADGET, {
    variables: {
      gadgetId
    }
  })

  const commentsQuery = useQuery<
    {
      gadgetComments: Comment[]
    },
    QueryGadgetArgs
  >(GET_COMMENTS, {
    variables: {
      gadgetId
    }
  })

  const [createComment, createCommentMutation] = useMutation<
    {
      createComment: Comment
    },
    MutationCreateCommentArgs
  >(CREATE_COMMENT, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_COMMENTS,
          variables: {
            gadgetId
          }
        }
      ]
    }
  })

  const [createRequest] = useMutation<
    {
      createRequest: GadgetRequest
    },
    MutationCreateRequestArgs
  >(REQUEST_GADGET, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_GADGET,
          variables: {
            gadgetId
          }
        }
      ]
    }
  })

  return (
    <>
      <Head>
        <title>
          {gadgetQuery.data ? gadgetQuery.data.gadget.title : 'Loading'} /
          GadgetSwap
        </title>
      </Head>

      <Header loggedIn={!!token} />

      <main>
        {(gadgetQuery.loading || commentsQuery.loading) && (
          <Spinner className="mb-8" />
        )}
        {gadgetQuery.data && (
          <GadgetDetails
            gadget={gadgetQuery.data.gadget}
            userId={userId}
            onRequest={description =>
              createRequest({
                variables: {
                  description,
                  gadgetId
                }
              })
            }
          />
        )}
        {commentsQuery.data && (
          <GadgetComments
            className="mt-8"
            comments={commentsQuery.data.gadgetComments}
          />
        )}
        {gadgetQuery.data && commentsQuery.data && (
          <CommentForm
            loading={createCommentMutation.loading || commentsQuery.loading}
            loggedIn={!!token}
            onReply={body =>
              createComment({
                variables: {
                  body,
                  gadgetId
                }
              })
            }
          />
        )}
      </main>

      <Footer />
    </>
  )
}

GadgetById.getInitialProps = async context => {
  const { token, userId } = parseCookies(context)

  return {
    token,
    userId
  }
}

export default GadgetById
