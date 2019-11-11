import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { colors } from '../assets/styles'

const Loading = styled.div<Props>`
  animation: spinner 1s linear infinite;
  border-radius: 100%;
  border: 2px solid
    ${props => (props.dark ? colors.foreground : colors.background)};
  border-top-color: transparent;
  height: 1.25em;
  width: 1.25em;

  @keyframes spinner {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
`

interface Props {
  dark?: boolean
}

export const Spinner: FunctionComponent<Props> = ({ dark }) => (
  <Loading dark={dark} />
)
