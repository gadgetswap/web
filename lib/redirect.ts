import { NextPageContext } from 'next'
import Router from 'next/router'

export const redirect = ({ res }: NextPageContext, path: string) => {
  if (res) {
    res.writeHead(302, {
      Location: path
    })

    res.end()
  } else {
    Router.replace(path)
  }
}
