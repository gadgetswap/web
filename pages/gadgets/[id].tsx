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
  MutationCreateCommentArgs,
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
      status
      title
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
      body
      user {
        id
        name
      }
      createdAt
    }
  }
`

interface Props {
  token: string
}

const GadgetById: NextPage<Props> = ({ token }) => {
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

  if (gadgetQuery.loading || commentsQuery.loading) {
    return <Spinner />
  }

  const {
    data: { gadget }
  } = gadgetQuery

  const {
    data: { gadgetComments }
  } = commentsQuery

  return (
    <>
      <Head>
        <title>{gadget.title} / GadgetSwap</title>
      </Head>

      <Header loggedIn={!!token} />

      <main>
        <GadgetDetails gadget={gadget} />
        <GadgetComments className="mt-8" comments={gadgetComments} />
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
      </main>

      <Footer />
    </>
  )
}

GadgetById.getInitialProps = async context => {
  const { token } = parseCookies(context)

  return {
    token
  }
}

export default GadgetById
