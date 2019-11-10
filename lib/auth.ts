import { ApolloClient, InMemoryCache } from 'apollo-boost'
import gql from 'graphql-tag'

import { User } from '../graphql/types'

const GET_PROFILE = gql`
  query profile {
    profile {
      id
      name
      email
      createdAt
    }
  }
`

export const withAuth = async (client: ApolloClient<InMemoryCache>) => {
  try {
    const {
      data: { profile }
    } = await client.query<{
      profile: User
    }>({
      query: GET_PROFILE
    })

    return profile
  } catch (error) {
    return null
  }
}
