import Link from 'next/link'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { colors } from '../assets/styles'
import { Gadget } from '../types/graphql'

const Main = styled.a`
  background: ${colors.backgroundDark};
  border-radius: 0.25em;
  flex: 0 1 calc(100% / 4 - 2em);
  margin: 1em;
  padding: 2em;
  position: relative;

  &:hover {
    background: ${colors.primary};
    color: ${colors.background};
  }

  h2 {
    font-size: 2em;
    margin: 0;
  }

  p {
    margin: 2em 0;
  }
`

const Quantity = styled.div`
  background: ${colors.accent};
  border-radius: 100%;
  color: ${colors.primary};
  line-height: 2em;
  position: absolute;
  right: 1em;
  text-align: center;
  top: 1em;
  width: 2em;
`

const Images = styled.section`
  display: flex;
  margin: -1em;

  figure {
    border-radius: 0.25em;
    margin: 1em;
    overflow: hidden;

    img {
      height: 4em;
    }
  }
`

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
    <Main>
      <Quantity>{quantity}</Quantity>
      <h2>{title}</h2>
      <p>{description}</p>
      {!hideLocation && (
        <p>
          {city}, {country}
        </p>
      )}
      <Images>
        {images.map((image, index) => (
          <figure key={index}>
            <img src={image} alt={title} />
          </figure>
        ))}
      </Images>
    </Main>
  </Link>
)
