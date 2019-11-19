import { NextPage } from 'next'
import { destroyCookie } from 'nookies'

import { redirect } from '../lib'

const Logout: NextPage = () => null

Logout.getInitialProps = async context => {
  // @ts-ignore
  await context.apolloClient.resetStore()

  destroyCookie(context, 'token')
  destroyCookie(context, 'userId')

  redirect(context, '/')

  return {}
}

export default Logout
