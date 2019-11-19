import { ExecutionResult } from 'apollo-boost'
import clsx from 'clsx'
import moment from 'moment'
import Link from 'next/link'
import React, { FunctionComponent, useState } from 'react'

import { Gadget, GadgetRequestStatus, GadgetStatus } from '../../types/graphql'
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
  gadget: { id, requests, status, title },
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
        <p className="text-red-500 mt-4">No requests</p>
      )}
      {requests.map((request, index) => {
        const isApproved = request.status === GadgetRequestStatus.Approved
        const isDenied = request.status === GadgetRequestStatus.Denied
        const isPending = request.status === GadgetRequestStatus.Pending

        return (
          <div
            key={index}
            className="flex my-8 flex-col lg:flex-row lg:items-center">
            <img
              alt={request.user.name}
              className="hidden lg:block mr-8 h-12 w-12 rounded-full"
              src={`https://api.adorable.io/avatars/200/${request.user.id}`}
            />
            <div className="flex-1">
              <header className="flex items-center mb-4">
                <img
                  alt={request.user.name}
                  className="lg:hidden mr-2 h-8 w-8 rounded-full"
                  src={`https://api.adorable.io/avatars/200/${request.user.id}`}
                />
                <h4 className="font-semibold">{request.user.name}</h4>
                <span className="text-gray-600 text-sm ml-2">
                  {moment(request.createdAt).fromNow()}
                </span>
              </header>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                {request.description
                  .split('\n')
                  .map(description => description.trim())
                  .filter(Boolean)
                  .map((description, index) => (
                    <p key={index} className="my-2">
                      {description}
                    </p>
                  ))}
              </div>
              {!isPending && (
                <div
                  className={clsx(
                    'font-semibold',
                    'inline-block',
                    'mt-4',
                    'px-2',
                    'py-1',
                    'rounded-full',
                    'text-white',
                    'text-xs',

                    isApproved && 'bg-green-500',
                    isDenied && 'bg-red-500'
                  )}>
                  {request.status}
                </div>
              )}
            </div>
            {loading.get(request.id) && (
              <Spinner className="mt-8 self-center lg:mt-0 lg:ml-8" />
            )}
            {!loading.get(request.id) && (
              <div className="flex mt-8 lg:mt-0">
                {!isApproved && status === GadgetStatus.Available && (
                  <button
                    className="flex-1 justify-center px-6 py-2 rounded-full lg:ml-8 bg-green-500"
                    onClick={async () => {
                      updateLoading(request.id, true)

                      await onUpdate(
                        gadgetId,
                        request.id,
                        GadgetRequestStatus.Approved
                      )

                      updateLoading(request.id, false)
                    }}>
                    Approve
                  </button>
                )}
                {!isDenied && (
                  <button
                    className={clsx(
                      'bg-red-500',
                      'flex-1',
                      'justify-center',
                      'lg:ml-8',
                      'px-4',
                      'py-2',
                      'rounded-full',

                      isPending && 'ml-8'
                    )}
                    onClick={async () => {
                      updateLoading(request.id, true)

                      await onUpdate(
                        gadgetId,
                        request.id,
                        GadgetRequestStatus.Denied
                      )

                      updateLoading(request.id, false)
                    }}>
                    {isApproved ? 'Cancel' : 'Ignore'}
                  </button>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
