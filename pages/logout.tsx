import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuth } from '../hooks'

const Logout: NextPage = () => {
  const { logout } = useAuth()
  const { replace } = useRouter()

  useEffect(() => {
    logout()

    replace('/')
  }, [])

  return null
}

Logout.getInitialProps = async context => {
  // @ts-ignore
  await context.apolloClient.resetStore()

  return {}
}

export default Logout
