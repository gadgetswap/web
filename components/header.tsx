import Link from 'next/link'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { User } from '../types/graphql'
import { Logo } from './logo'
import { NavLink } from './nav-link'

const Main = styled.header`
  align-items: stretch;
  display: flex;
  justify-content: space-between;

  > a {
    align-items: center;
    display: flex;

    svg {
      height: 2em;
      margin: 2em 1em 2em 2em;
      width: 2em;
    }

    span {
      font-weight: 500;
    }
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

export const Header: FunctionComponent<Props> = ({ user }) => (
  <Main>
    <Link href="/">
      <a>
        <Logo />
        <span>GadgetSwap</span>
      </a>
    </Link>
    {user && (
      <nav>
        <NavLink href="/create">Post</NavLink>
        <NavLink href="/browse">Browse</NavLink>
        <NavLink href="/requests">Requests</NavLink>
        <NavLink href="/profile">Profile</NavLink>
        <Link href="/logout">
          <a>Sign out</a>
        </Link>
      </nav>
    )}
    {!user && (
      <nav>
        <NavLink href="/browse">Browse</NavLink>
        <NavLink href="/register">Sign up</NavLink>
        <NavLink href="/login">Sign in</NavLink>
      </nav>
    )}
  </Main>
)
