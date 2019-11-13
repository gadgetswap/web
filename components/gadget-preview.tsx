import Link from 'next/link'
import React, { FunctionComponent } from 'react'

import { Gadget } from '../types/graphql'

interface Props {
  gadget: Gadget
  hideLocation?: boolean
}

export const GadgetPreview: FunctionComponent<Props> = ({
  gadget: {
    description,
    id,
    images,
    location: { city, country },
    quantity,
    title
  },
  hideLocation
}) => (
  <Link href={`/gadgets/${id}`}>
    <a className="flex-gadget-1 lg:flex-gadget-2 xl:flex-gadget-3 bg-gray-100 rounded m-4 p-8 relative hover:bg-gray-300">
      <div className="bg-accent rounded-full text-primary text-center leading-loose absolute w-8 top-0 right-0 m-4">
        {quantity}
      </div>
      <h2 className="text-3xl font-medium">{title}</h2>
      <p className="my-4">{description}</p>
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
