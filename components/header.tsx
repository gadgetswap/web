import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { img_gadgetswap, img_gadgetswap_active } from '../assets'
import { User } from '../graphql/types'
import { NavLink } from './nav-link'

const Main = styled.header`
  align-items: stretch;
  display: flex;
  justify-content: space-between;

  img {
    height: 2em;
    margin: 2em;
    width: 2em;
  }

  nav {
    display: flex;

    a {
      align-items: center;
      display: flex;
      padding: 0 2em;
    }
  }
`

interface Props {
  user?: User
}

export const Header: FunctionComponent<Props> = ({ user }) => {
  const { pathname } = useRouter()

  return (
    <Main>
      <Link href="/">
        <a>
          <img
            src={pathname === '/' ? img_gadgetswap_active : img_gadgetswap}
            alt="GadgetSwap"
          />
        </a>
      </Link>
      {user && (
        <nav>
          <NavLink href="/browse">Browse</NavLink>
          <Link href="/logout">
            <a>Sign out</a>
          </Link>
        </nav>
      )}
      {!user && (
        <nav>
          <NavLink href="/register">Sign up</NavLink>
          <NavLink href="/login">Sign in</NavLink>
        </nav>
      )}
    </Main>
  )
}
