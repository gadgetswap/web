import Link from 'next/link'
import React, { FunctionComponent, useState } from 'react'

import { Spinner } from './spinner'

interface Props {
  loading: boolean
  loggedIn: boolean

  onReply: (body: string) => void
}

export const CommentForm: FunctionComponent<Props> = ({
  loading,
  loggedIn,
  onReply
}) => {
  const [body, setBody] = useState('')

  if (loggedIn) {
    return (
      <form
        className="flex flex-col md:flex-row"
        onSubmit={event => {
          event.preventDefault()

          if (body.trim()) {
            onReply(body.trim())

            setBody('')
          }
        }}>
        <textarea
          className="flex-1 bg-gray-200 border-none rounded-b-none md:rounded md:rounded-r-none resize-none"
          onChange={event => setBody(event.target.value)}
          placeholder="Say something nice"
          value={body}
        />
        <button className="flex items-center justify-center rounded-t-none md:rounded md:rounded-l-none md:w-40">
          {loading ? <Spinner light /> : 'Reply'}
        </button>
      </form>
    )
  }

  return (
    <div className="text-red-500">
      You need to be&nbsp;
      <Link href="/login">
        <a className="font-semibold">signed in</a>
      </Link>
      &nbsp;to comment.
    </div>
  )
}
