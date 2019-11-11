import { NextPage } from 'next'
import { destroyCookie } from 'nookies'

import { redirect } from '../lib'

const Logout: NextPage = () => null

Logout.getInitialProps = async context => {
  // @ts-ignore
  await context.apolloClient.resetStore()

  destroyCookie(context, 'locationId')
  destroyCookie(context, 'token')

  redirect(context, '/')

  return {}
}

export default Logout
