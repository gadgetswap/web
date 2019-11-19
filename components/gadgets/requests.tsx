import moment from 'moment'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'

import { Gadget, GadgetRequestStatus } from '../../types/graphql'

interface Props {
  gadget: Gadget
}

export const GadgetRequests: FunctionComponent<Props> = ({
  gadget: { id, requests, title }
}) => {
  const data = requests.filter(
    ({ status }) => status === GadgetRequestStatus.Pending
  )

  if (data.length === 0) {
    return null
  }

  return (
    <div className="my-8">
      <header className="flex items-center">
        <h3 className="font-semibold text-2xl">{title}</h3>
        <Link href={`/gadgets/${id}`}>
          <a className="text-gray-500 text-xs ml-4">View</a>
        </Link>
      </header>
      {data.length === 0 && <p className="text-orange-500 mt-4">No requests</p>}
      {data.map(({ createdAt, description, user: { id, name } }, index) => (
        <div
          key={index}
          className="flex my-8 flex-col lg:flex-row lg:items-center">
          <img
            alt={name}
            className="hidden md:block mr-8 h-12 w-12 rounded-full"
            src={`https://api.adorable.io/avatars/200/${id}`}
          />
          <div className="flex-1 bg-gray-100 p-4 rounded">
            <header className="flex items-center mb-4">
              <img
                alt={name}
                className="md:hidden mr-2 h-8 w-8 rounded-full"
                src={`https://api.adorable.io/avatars/200/${id}`}
              />
              <h4 className="font-semibold">{name}</h4>
              <span className="text-gray-600 text-sm ml-2">
                {moment(createdAt).fromNow()}
              </span>
            </header>
            {description
              .split('\n')
              .map(description => description.trim())
              .filter(Boolean)
              .map((description, index) => (
                <p key={index} className="mt-2">
                  {description}
                </p>
              ))}
          </div>
          <div className="flex justify-between mt-8 lg:mt-0">
            <button className="flex- justify-center px-6 py-2 rounded-full lg:ml-8 bg-green-500">
              Approve
            </button>
            <button className="flex- justify-center px-4 py-2 rounded-full ml-8 lg:ml-8 bg-red-500">
              Ignore
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
