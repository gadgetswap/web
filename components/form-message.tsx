import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { colors } from '../assets/styles'

const Main = styled.div`
  border-radius: 0.25em;
  color: ${colors.background};
  margin: 2em 0;
  padding: 1em;

  &.error {
    background: ${colors.state.error};
  }

  &.message {
    background: ${colors.state.message};
  }

  &.success {
    background: ${colors.state.success};
  }
`

interface Props {
  message: string
  type: 'error' | 'message' | 'success'
}

export const FormMessage: FunctionComponent<Props> = ({ message, type }) => (
  <Main className={type}>{message}</Main>
)
