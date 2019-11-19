import { ExecutionResult } from 'apollo-boost'
import moment from 'moment'
import Link from 'next/link'
import React, { FunctionComponent, useState } from 'react'

import { Gadget, GadgetRequestStatus } from '../../types/graphql'
import { Spinner } from '../spinner'

interface Props {
  gadget: Gadget

  onUpdate: (
    gadgetId: string,
    requestId: string,
    status: GadgetRequestStatus
  ) => Promise<ExecutionResult>
}

export const GadgetRequests: FunctionComponent<Props> = ({
  gadget: { id, requests, title },
  onUpdate
}) => {
  const [loading, setLoading] = useState<Map<string, boolean>>(new Map())

  const updateLoading = (requestId: string, isLoading: boolean) => {
    const copy = new Map(loading)

    if (isLoading) {
      copy.set(requestId, isLoading)
    } else {
      copy.delete(requestId)
    }

    setLoading(copy)
  }

  const gadgetId = id

  if (requests.length === 0) {
    return null
  }

  return (
    <div className="my-8">
      <header className="flex items-center">
        <h3 className="font-semibold text-2xl">{title}</h3>
        <Link href={`/gadgets/${gadgetId}`}>
          <a className="text-gray-500 text-xs ml-4">View</a>
        </Link>
      </header>
      {requests.length === 0 && (
        <p className="text-orange-500 mt-4">No requests</p>
      )}
      {requests.map(({ createdAt, description, id, status, user }, index) => (
        <div
          key={index}
          className="flex my-8 flex-col lg:flex-row lg:items-center">
          <img
            alt={user.name}
            className="hidden md:block mr-8 h-12 w-12 rounded-full"
            src={`https://api.adorable.io/avatars/200/${user.id}`}
          />
          <div className="flex-1 bg-gray-100 p-4 rounded">
            <header className="flex items-center mb-4">
              <img
                alt={user.name}
                className="md:hidden mr-2 h-8 w-8 rounded-full"
                src={`https://api.adorable.io/avatars/200/${user.id}`}
              />
              <h4 className="font-semibold">{user.name}</h4>
              <span className="text-gray-600 text-sm ml-2">
                {moment(createdAt).fromNow()}
              </span>
            </header>
            {status}
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
          {loading.get(id) && (
            <Spinner className="mt-8 self-center lg:mt-0 lg:ml-8" />
          )}
          {!loading.get(id) && (
            <div className="flex justify-between mt-8 lg:mt-0">
              <button
                className="flex- justify-center px-6 py-2 rounded-full lg:ml-8 bg-green-500"
                onClick={async () => {
                  updateLoading(id, true)

                  await onUpdate(gadgetId, id, GadgetRequestStatus.Approved)

                  updateLoading(id, false)
                }}>
                Approve
              </button>
              <button
                className="flex- justify-center px-4 py-2 rounded-full ml-8 lg:ml-8 bg-red-500"
                onClick={async () => {
                  updateLoading(id, true)

                  await onUpdate(gadgetId, id, GadgetRequestStatus.Denied)

                  updateLoading(id, false)
                }}>
                Ignore
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
