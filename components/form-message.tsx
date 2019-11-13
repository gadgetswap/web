import clsx from 'clsx'
import React, { FunctionComponent } from 'react'

interface Props {
  message: string
  type: 'error' | 'message' | 'success'
}

export const FormMessage: FunctionComponent<Props> = ({ message, type }) => (
  <div
    className={clsx(
      'rounded',
      'font-medium',
      'text-white',
      'my-8',
      'p-4',
      type === 'message' && 'bg-blue-500',
      type === 'error' && 'bg-red-500',
      type === 'success' && 'bg-green-500'
    )}>
    {message}
  </div>
)
