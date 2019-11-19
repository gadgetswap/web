import moment from 'moment'
import React, { FunctionComponent, HTMLAttributes } from 'react'

import { img_crown } from '../../assets'
import { Comment, Gadget } from '../../types/graphql'

interface Props {
  comments: Comment[]
  gadget: Gadget
}

export const GadgetComments: FunctionComponent<Props &
  HTMLAttributes<HTMLDivElement>> = ({ className, comments, gadget }) => (
  <div className={className}>
    <h2 className="text-4xl font-semibold">Comments</h2>
    {comments.length === 0 && (
      <div className="text-blue-500 my-8">No comments yet.</div>
    )}
    {comments.map(({ body, createdAt, user: { id, name } }, index) => (
      <div key={index} className="flex my-8 items-center">
        <img
          className="hidden md:block mr-8 h-12 w-12 rounded-full"
          src={`https://api.adorable.io/avatars/200/${id}`}
          alt={name}
        />
        <div className="bg-gray-100 p-4 rounded">
          <header className="flex items-center mb-4">
            <img
              className="md:hidden mr-2 h-8 w-8 rounded-full"
              src={`https://api.adorable.io/avatars/200/${id}`}
              alt={name}
            />
            <h4 className="font-semibold">{name}</h4>
            {gadget.user.id === id && (
              <img className="ml-2 h-4 w-4" src={img_crown} />
            )}
            <span className="text-gray-600 text-sm ml-2">
              {moment(createdAt).fromNow()}
            </span>
          </header>
          {body
            .split('\n')
            .map(body => body.trim())
            .filter(Boolean)
            .map((body, index) => (
              <p key={index} className="mt-2">
                {body}
              </p>
            ))}
        </div>
      </div>
    ))}
  </div>
)
