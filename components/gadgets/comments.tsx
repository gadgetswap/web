import moment from 'moment'
import React, { FunctionComponent, HTMLAttributes } from 'react'

import { Comment } from '../../types/graphql'

interface Props {
  comments: Comment[]
}

export const GadgetComments: FunctionComponent<Props &
  HTMLAttributes<HTMLDivElement>> = ({ className, comments }) => (
  <div className={className}>
    <h2 className="text-4xl font-semibold">Comments</h2>
    {comments.map(({ body, createdAt, user: { id, name } }, index) => (
      <div key={index} className="flex my-8 items-center">
        <img
          className="hidden md:block mr-8 h-12 rounded-full"
          src={`https://api.adorable.io/avatars/200/${id}`}
          alt={name}
        />
        <div className="bg-gray-100 p-4 rounded">
          <header className="flex items-center mb-4">
            <img
              className="md:hidden mr-2 h-8 rounded-full"
              src={`https://api.adorable.io/avatars/200/${id}`}
              alt={name}
            />
            <h4 className="font-semibold">{name}</h4>
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
