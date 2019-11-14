import Link from 'next/link'
import React, { FunctionComponent, HTMLAttributes } from 'react'

import { Gadget, GadgetStatus } from '../../types/graphql'
import { ImageWithZoom } from '../image-with-zoom'

interface Props {
  gadget: Gadget
}

export const GadgetDetails: FunctionComponent<Props &
  HTMLAttributes<HTMLDivElement>> = ({
  className,
  gadget: {
    description,
    images,
    location: { city, country },
    quantity,
    title,
    status
  }
}) => (
  <div className={className}>
    <h1 className="text-5xl font-semibold mb-8">{title}</h1>
    <div className="flex flex-col lg:flex-row mb-8">
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
)
