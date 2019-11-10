import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { colors } from '../assets/styles'

const Main = styled.footer`
  margin: 2em;

  p {
    color: ${colors.foregroundLight};
    line-height: 1;
    margin: 0;
  }
`

export const Footer: FunctionComponent = () => {
  const year = new Date().getFullYear()

  return (
    <Main>
      <p>&copy; {year} / GadgetSwap</p>
    </Main>
  )
}
