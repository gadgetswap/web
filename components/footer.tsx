import React, { FunctionComponent } from 'react'

export const Footer: FunctionComponent = () => (
  <footer className="m-8">
    <p className="text-gray-500 m-0 leading-none">
      &copy; {new Date().getFullYear()} / GadgetSwap
    </p>
  </footer>
)
