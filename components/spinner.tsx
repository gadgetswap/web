import React, { FunctionComponent, HTMLAttributes } from 'react'

interface Props {
  light?: boolean
}

export const Spinner: FunctionComponent<Props &
  HTMLAttributes<HTMLDivElement>> = ({ className, light }) => (
  <>
    <div className={className} />

    <style jsx>{`
      div {
        animation: spinner 1s linear infinite;
        border-radius: 100%;
        border: 2px solid ${light ? 'white' : 'black'};
        border-top-color: transparent;
        height: 1.25em;
        width: 1.25em;
      }

      @keyframes spinner {
        from {
          transform: rotate(0);
        }

        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </>
)
