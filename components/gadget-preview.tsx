import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { colors } from '../assets/styles'
import { Gadget } from '../graphql/types'

const Main = styled.a`
  background: ${colors.backgroundDark};
  flex: 0 1 calc(100% / 3 - 2em);
  margin: 1em;
  padding: 2em;
  position: relative;

  h2 {
    margin: 0;
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
    background-color: ${colors.background};
    background-position: center;
    background-size: cover;
    height: 5em;
    margin: 1em;
    width: 5em;
  }
`

interface Props {
  gadget: Gadget
}

export const GadgetPreview: FunctionComponent<Props> = ({
  gadget: { description, images, quantity, title }
}) => (
  <Main>
    <Quantity>{quantity}</Quantity>
    <h2>{title}</h2>
    <p>{description}</p>
    <Images>
      {images.map((image, index) => (
        <figure
          key={index}
          style={{
            backgroundImage: `url(${image})`
          }}
        />
      ))}
    </Images>
  </Main>
)
