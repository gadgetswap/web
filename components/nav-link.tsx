import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Main = styled.a`
  &.active {
    font-weight: 700;
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
