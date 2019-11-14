import clsx from 'clsx'
import React, {
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useState
} from 'react'

interface Props {
  source: string
}

export const ImageWithZoom: FunctionComponent<Props &
  HTMLAttributes<HTMLImageElement>> = ({ className, source, title }) => {
  const [open, setOpen] = useState(false)

  const listener = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', listener)

    return () => document.removeEventListener('keyup', listener)
  }, [])

  return (
    <>
      <img
        className={clsx(className, 'cursor-pointer')}
        src={source}
        alt={title}
        onClick={() => setOpen(true)}
      />
      <div
        className={clsx(
          'bg-modal',
          'fixed',
          'flex',
          'inset-0',
          'items-center',
          'justify-center',
          'p-8',
          'z-30',

          'lg:p-20',

          open && 'open'
        )}
        onClick={() => setOpen(false)}>
        <img
          className="cursor-pointer rounded shadow-xl max-h-full max-w-full"
          src={source}
          alt={title}
        />
      </div>

      <style jsx>{`
        .bg-modal {
          opacity: 0;
          transition: 0.2s linear;
          visibility: hidden;
        }

        .bg-modal.open {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </>
  )
}
