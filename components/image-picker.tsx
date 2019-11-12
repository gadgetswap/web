import React, { FunctionComponent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import { colors } from '../assets/styles'

const Main = styled.div``

const Thumbs = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -1em -1em 1em;

  figure {
    border-radius: 0.25em;
    cursor: pointer;
    margin: 1em;
    overflow: hidden;

    img {
      height: 8em;
    }
  }
`

const DropArea = styled.div<{ active: boolean }>`
  border: 2px dashed
    ${props => (props.active ? colors.foreground : colors.foregroundLight)};
  border-radius: 0.25em;
  height: 10em;
  padding: 0 1em;
`

const Errors = styled.div`
  margin: 2em 0;

  div {
    background: ${colors.state.error};
    border-radius: 0.25em;
    color: ${colors.background};
    cursor: pointer;
    margin: 1em 0;
    padding: 1em;
  }
`

interface Props {
  disabled?: boolean

  onChange: (images: File[]) => void
  onRemove: (index: number) => void
}

export const ImagePicker: FunctionComponent<Props> = ({
  disabled,
  onChange,
  onRemove
}) => {
  const [errors, setErrors] = useState<string[]>([])
  const [thumbs, setThumbs] = useState<string[]>([])

  const onDrop = useCallback(
    async files => {
      if (disabled) {
        return
      }

      setErrors([])

      const errors = []
      const next = []

      await Promise.all(
        files.map(
          (file: File) =>
            new Promise((resolve, reject) => {
              const { name, type, size } = file

              if (!type.match(/(jpeg|jpg|png)/)) {
                errors.push(`${name} is not acceptable`)

                return resolve()
              }

              if (size > 1000 * 1000 * 3) {
                errors.push(`${name} is too large`)

                return resolve()
              }

              const reader = new FileReader()

              reader.onabort = () => reject()

              reader.onerror = () => reject()

              reader.onload = () => {
                next.push(reader.result)

                resolve()
              }

              reader.readAsDataURL(file)
            })
        )
      )

      setErrors(errors)
      setThumbs([...thumbs, ...next])

      onChange(files)
    },
    [errors, thumbs, setErrors, setThumbs, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Main>
      {thumbs.length > 0 && (
        <Thumbs>
          {thumbs.map((thumb, index) => (
            <figure
              key={index}
              onClick={() => {
                const copy = [...thumbs]

                copy.splice(index, 1)

                setThumbs(copy)

                onRemove(index)
              }}>
              <img src={thumb} />
            </figure>
          ))}
        </Thumbs>
      )}
      <DropArea active={isDragActive} {...getRootProps()}>
        <input
          {...getInputProps({
            accept: '.jpg,.jpeg,.png',
            disabled
          })}
        />
        <p>Drop images (JPGs, PNGs) under 3mb here.</p>
        {thumbs.length > 0 && <p>Click an image to remove.</p>}
      </DropArea>
      {errors.length > 0 && (
        <Errors>
          {errors.map((error, index) => (
            <div
              key={index}
              onClick={() => {
                const copy = [...errors]

                copy.splice(index, 1)

                setErrors(copy)
              }}>
              {error}
            </div>
          ))}
        </Errors>
      )}
    </Main>
  )
}
