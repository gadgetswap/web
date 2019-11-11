import ApolloClient, { InMemoryCache } from 'apollo-boost'
import Cookies from 'js-cookie'
import withApollo from 'next-with-apollo'
import { parseCookies } from 'nookies'

export default withApollo(
  ({ ctx, initialState }) =>
    new ApolloClient({
      cache: new InMemoryCache().restore(initialState || {}),
      request(operation) {
        let token: string

        if (process.browser) {
          token = Cookies.get('token')
        } else {
          token = parseCookies(ctx).token
        }

        if (token) {
          operation.setContext({
            headers: {
              authorization: `Bearer ${token}`
            }
          })
        }
      },
      uri: process.env.uri
    })
)
