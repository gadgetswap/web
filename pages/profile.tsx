import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import { Footer, Header, Spinner } from '../components'
import { redirect } from '../lib'
import { User } from '../types/graphql'

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

interface Props {
  token: string
}

const Profile: NextPage<Props> = ({ token }) => {
  const { data, loading } = useQuery<{
    profile: User
  }>(GET_PROFILE)

  return (
    <>
      <Head>
        <title>{data ? data.profile.name : 'Profile'} / GadgetSwap</title>
      </Head>

      <Header loggedIn={!!token} />

      <main className="items-center justify-center">
        {loading && <Spinner className="mt-8" />}
        {data && (
          <>
            <img
              className="rounded-full"
              alt={data.profile.name}
              src={`https://api.adorable.io/avatars/200/${data.profile.id}`}
            />
            <h1 className="text-5xl font-semibold mt-8">{data.profile.name}</h1>
            <p className="mt-4">
              <a
                className="text-blue-500"
                href={`mailto:${data.profile.email}`}>
                {data.profile.email}
              </a>
            </p>
          </>
        )}
      </main>

      <Footer />
    </>
  )
}

Profile.getInitialProps = async context => {
  const { token } = parseCookies(context)

  if (!token) {
    redirect(context, '/')
  }

  return {
    token
  }
}

export default Profile
