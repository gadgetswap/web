import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { colors } from '../assets/styles'

const Main = styled.a`
  position: relative;

  &:before {
    content: '';
    height: 1em;
    margin: 0.125em 0 0 -0.125em;
    position: absolute;
    transition: 0.2s;
    width: calc(100% - 4em);
    transform: scale(0.1);
    z-index: -1;
  }

  &:hover,
  &.active {
    font-weight: 600;

    &:before {
      background: ${colors.accent};
      transform: skew(-5deg, -5deg) scale(1);
    }
  }
`

export const NavLink: FunctionComponent<LinkProps> = ({ children, href }) => {
  const { asPath } = useRouter()

  return (
    <Link href={href}>
      <Main className={asPath.indexOf(href.toString()) === 0 ? 'active' : ''}>
        {children}
      </Main>
    </Link>
  )
}
