import clsx from 'clsx'
import React, { FunctionComponent, HTMLAttributes, useEffect } from 'react'

interface Props {
  visible: boolean

  onClose: () => void
}

export const Modal: FunctionComponent<Props &
  HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  visible,
  onClose
}) => {
  const listener = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', listener)

    return () => document.removeEventListener('keyup', listener)
  }, [])

  return (
    <>
      <div
        className={clsx(
          className,

          'bg-modal',
          'fixed',
          'flex',
          'inset-0',
          'items-center',
          'justify-center',
          'p-8',
          'z-30',

          'lg:p-20',

          visible && 'visible'
        )}>
        <div className="bg-white rounded shadow-xl max-h-full max-w-full overflow-hidden">
          {children}
        </div>
      </div>

      <style jsx>{`
        .bg-modal {
          opacity: 0;
          transition: 0.2s linear;
          visibility: hidden;
        }

        .bg-modal.visible {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </>
  )
}
