import clsx from 'clsx'
import Link from 'next/link'
import React, { FunctionComponent, useState } from 'react'

import { img_menu_close, img_menu_open } from '../assets'
import { Logo } from './logo'
import { NavLink } from './nav-link'

interface Props {
  loggedIn?: boolean
}

export const Header: FunctionComponent<Props> = ({ loggedIn }) => {
  const [visible, setVisible] = useState(false)

  return (
    <header className="flex items-stretch justify-between">
      <Link href="/">
        <a className="flex items-center">
          <Logo className="h-8 w-8 my-8 ml-8 mr-4" />
          <span className="font-medium mr-8">GadgetSwap</span>
        </a>
      </Link>
      <a
        className="absolute top-0 right-0 lg:hidden z-20"
        href="#menu"
        onClick={event => {
          event.preventDefault()

          setVisible(!visible)
        }}>
        <img
          className="h-6 m-8 w-6"
          src={visible ? img_menu_close : img_menu_open}
          alt="Menu"
        />
      </a>
      <nav
        className={clsx(
          'bg-modal',
          'fixed',
          'flex-col',
          'inset-0',
          'justify-center',
          'overflow-y-auto',
          'right-0',
          'top-0',
          'z-10',

          visible ? 'flex' : 'hidden',

          'lg:flex',
          'lg:flex-row',
          'lg:static'
        )}>
        {loggedIn && (
          <>
            <NavLink href="/create">Post</NavLink>
            <NavLink href="/browse">Browse</NavLink>
            <NavLink href="/requests">Requests</NavLink>
            <NavLink href="/profile">Profile</NavLink>
            <NavLink href="/logout">Sign out</NavLink>
          </>
        )}
        {!loggedIn && (
          <>
            <NavLink href="/browse">Browse</NavLink>
            <NavLink href="/register">Sign up</NavLink>
            <NavLink href="/login">Sign in</NavLink>
          </>
        )}
      </nav>
    </header>
  )
}
