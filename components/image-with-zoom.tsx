import clsx from 'clsx'
import React, { FunctionComponent, HTMLAttributes, useState } from 'react'

import { Modal } from './modal'

interface Props {
  source: string
}

export const ImageWithZoom: FunctionComponent<Props &
  HTMLAttributes<HTMLImageElement>> = ({ className, source, title }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <img
        alt={title}
        className={clsx(className, 'cursor-pointer')}
        onClick={() => setVisible(true)}
        src={source}
      />
      <Modal onClose={() => setVisible(false)} visible={visible}>
        <img
          alt={title}
          className="cursor-pointer rounded shadow-xl max-h-full max-w-full"
          onClick={() => setVisible(false)}
          src={source}
        />
      </Modal>
    </>
  )
}
