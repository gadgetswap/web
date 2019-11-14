import React, { FunctionComponent } from 'react'

export const Footer: FunctionComponent = () => (
  <footer className="m-8">
    <p className="text-gray-500 m-0 leading-none">
      &copy; {new Date().getFullYear()} / GadgetSwap /&nbsp;
      <a
        href="http://github.com/gadgetswap"
        target="_blank"
        rel="noopener noreferrer">
        GitHub
      </a>
    </p>
  </footer>
)
