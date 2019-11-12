import React, { ButtonHTMLAttributes, FunctionComponent } from 'react'
import styled from 'styled-components'

import { Spinner } from './spinner'

const Main = styled.button`
  align-items: center;
  display: flex;
`

interface Props {
  loading?: boolean
}

export const Button: FunctionComponent<Props &
  ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  loading,
  ...props
}) => <Main {...props}>{loading ? <Spinner /> : children}</Main>
