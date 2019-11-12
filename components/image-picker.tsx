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
  padding: 1em;
`

interface Props {
  onChange: (images: File[]) => void
}

export const ImagePicker: FunctionComponent<Props> = ({ onChange }) => {
  const [thumbs, setThumbs] = useState<string[]>([])

  const onDrop = useCallback(
    async files => {
      const next = []

      await Promise.all(
        files.map(
          (file: File) =>
            new Promise((resolve, reject) => {
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

      setThumbs([...thumbs, ...next])

      onChange(files)
    },
    [thumbs, setThumbs, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Main>
      {thumbs.length > 0 && (
        <Thumbs>
          {thumbs.map((thumb, index) => (
            <figure key={index}>
              <img src={thumb} />
            </figure>
          ))}
        </Thumbs>
      )}
      <DropArea active={isDragActive} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? 'Drop files here' : 'Drop files here to upload'}
      </DropArea>
    </Main>
  )
}
