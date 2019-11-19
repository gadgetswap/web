import moment from 'moment'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'

import { Gadget } from '../../types/graphql'

interface Props {
  gadget: Gadget
  hideLocation?: boolean
}

export const GadgetPreview: FunctionComponent<Props> = ({
  gadget: {
    createdAt,
    description,
    id,
    images,
    location: { city, country },
    quantity,
    title,
    user: { name }
  },
  hideLocation
}) => (
  <Link href={`/gadgets/${id}`}>
    <a className="flex-gadget-1 lg:flex-gadget-2 bg-gray-100 rounded m-4 p-8 hover:bg-gray-300">
      <header className="flex justify-between items-start">
        <h2 className="text-3xl font-medium">{title}</h2>
        <div className="bg-accent rounded-full text-primary text-center leading-loose w-8">
          {quantity}
        </div>
      </header>
      <div className="flex justify-between bg-gray-200 -mx-8 my-8 px-8 py-4">
        <span className="font-semibold">{name}</span>
        <span className="text-gray-600">{moment(createdAt).fromNow()}</span>
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
      {!hideLocation && (
        <p className="my-4">
          {city}, {country}
        </p>
      )}
      <div className="flex flex-wrap -m-4 mt-4">
        {images.map((image, index) => (
          <figure key={index} className="rounded m-4 overflow-hidden">
            <img className="h-16" src={image} alt={title} />
          </figure>
        ))}
      </div>
    </a>
  </Link>
)
