import { ExecutionResult } from 'apollo-boost'
import Link from 'next/link'
import React, { FunctionComponent, HTMLAttributes, useState } from 'react'

import { img_menu_close } from '../../assets'
import { Gadget, GadgetStatus } from '../../types/graphql'
import { ImageWithZoom } from '../image-with-zoom'
import { Modal } from '../modal'
import { Spinner } from '../spinner'

interface Props {
  gadget: Gadget
  userId: string

  onRequest: (description: string) => Promise<ExecutionResult>
}

export const GadgetDetails: FunctionComponent<Props &
  HTMLAttributes<HTMLDivElement>> = ({
  className,
  gadget: {
    description,
    images,
    isRequested,
    location: { city, country },
    quantity,
    status,
    title,
    user
  },
  userId,
  onRequest
}) => {
  const [loading, setLoading] = useState(false)
  const [requestDescription, setRequestDescription] = useState('')
  const [requested, setRequested] = useState(isRequested)
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div className={className}>
        <h1 className="text-5xl font-semibold mb-8">{title}</h1>
        <div className="flex flex-col lg:flex-row mb-8">
          {isRequested && (
            <span className="bg-gray-300 font-medium text-gray-600 px-4 py-2 rounded-full mb-8 lg:mb-0 lg:mr-8">
              Requested
            </span>
          )}
          {!isRequested && userId !== user.id && (
            <button
              className="px-4 py-2 rounded-full mb-8 lg:mb-0 lg:mr-8"
              onClick={() => setVisible(true)}>
              Request
            </button>
          )}
          <span className="font-medium bg-accent px-4 py-2 rounded-full">
            {status === GadgetStatus.Available
              ? `${quantity} available`
              : 'Not available'}
          </span>
          <Link href={`/browse/${country}/${city}`}>
            <a className="font-medium bg-accent px-4 py-2 rounded-full mt-8 lg:mt-0 lg:ml-8">
              {`${city}, ${country}`}
            </a>
          </Link>
        </div>
        {description
          .split('\n')
          .map(description => description.trim())
          .filter(Boolean)
          .map((description, index) => (
            <p key={index} className="my-4">
              {description}
            </p>
          ))}
        <div className="flex flex-wrap bg-gray-100 rounded -mx-4 mt-8 p-4">
          {images.map((image, index) => (
            <figure key={index} className="rounded m-4 overflow-hidden">
              <ImageWithZoom
                className="w-full md:w-auto md:h-40"
                source={image}
                title={title}
              />
            </figure>
          ))}
        </div>
      </div>

      <Modal
        visible={visible}
        onClose={() => {
          setRequested(false)
          setVisible(false)
        }}>
        <header className="flex items-stretch justify-between bg-accent">
          <h2 className="text-primary font-semibold text-xl m-8">{title}</h2>
          <a className="flex items-center justify-center px-8" href="#close">
            <img
              className="h-8 w-8"
              onClick={() => setVisible(false)}
              src={img_menu_close}
            />
          </a>
        </header>
        {requested && (
          <p className="m-8 text-green-500 font-medium">
            All done! {user.name} will get back to you soon.
          </p>
        )}
        {!requested && (
          <form
            className="m-8"
            onSubmit={async event => {
              event.preventDefault()

              if (requestDescription.trim()) {
                setLoading(true)

                await onRequest(requestDescription.trim())

                setLoading(false)
                setRequestDescription('')
                setRequested(true)
              }
            }}>
            <label>
              <span>
                Why do you want this gadget? And what are you willing to trade
                for it?
              </span>
              <textarea
                className="w-full"
                onChange={event => setRequestDescription(event.target.value)}
                placeholder="Convince the owner to part with their gadget"
                value={requestDescription}
              />
            </label>
            {loading ? <Spinner /> : <button>Request</button>}
          </form>
        )}
      </Modal>
    </>
  )
}
