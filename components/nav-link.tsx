import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'

export const NavLink: FunctionComponent<LinkProps> = ({ children, href }) => {
  const { asPath } = useRouter()

  return (
    <>
      <Link href={href}>
        <a
          className={clsx(
            'flex',
            'font-semibold',
            'items-center',
            'justify-center',
            'p-10',
            'relative',
            'text-3xl',

            'lg:font-normal',
            'lg:px-8',
            'lg:py-0',
            'lg:text-base',

            asPath.indexOf(href.toString()) === 0 && 'active'
          )}>
          {children}
        </a>
      </Link>

      <style jsx>{`
        a:before {
          content: '';
          height: 1em;
          margin: 0.125em 0 0 -0.125em;
          position: absolute;
          transition: 0.2s;
          width: calc(100% - 4em);
          transform: scale(0.1);
          z-index: -1;
        }

        a:hover:before,
        a.active:before {
          background: #fc0;
          transform: skew(-5deg, -5deg) scale(1);
        }
      `}</style>
    </>
  )
}
