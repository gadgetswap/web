import clsx from 'clsx'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface Props {
  disabled?: boolean

  onAdd: (images: File[]) => void
  onRemove: (index: number) => void
}

export const ImagePicker: FunctionComponent<Props> = ({
  disabled,
  onAdd,
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

      const errors: string[] = []
      const next: string[] = []

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
                next.push(reader.result as string)

                resolve()
              }

              reader.readAsDataURL(file)
            })
        )
      )

      setErrors(errors)
      setThumbs([...thumbs, ...next])

      onAdd(files)
    },
    [errors, thumbs, setErrors, setThumbs, onAdd]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div>
      {thumbs.length > 0 && (
        <div className="flex flex-wrap -mt-4 mb-4 -mx-4">
          {thumbs.map((thumb, index) => (
            <figure
              key={index}
              className="rounded cursor-pointer m-4 overflow-hidden"
              onClick={() => {
                const copy = [...thumbs]

                copy.splice(index, 1)

                setThumbs(copy)

                onRemove(index)
              }}>
              <img className="h-32" src={thumb} />
            </figure>
          ))}
        </div>
      )}

      <div
        className={clsx(
          'rounded',
          'h-40',
          'p-4',
          'border-2',
          'border-dashed',
          isDragActive ? 'border-gray-800' : 'border-gray-500'
        )}
        {...getRootProps()}>
        <input
          {...getInputProps({
            accept: '.jpg,.jpeg,.png',
            disabled
          })}
        />
        <p>Drop images (JPGs, PNGs) under 3mb here.</p>
        {thumbs.length > 0 && <p className="mt-4">Click an image to remove.</p>}
      </div>
      {errors.length > 0 && (
        <div className="my-8">
          {errors.map((error, index) => (
            <div
              key={index}
              className="border-red-500 border-2 rounded text-red-500 cursor-pointer my-4 p-4 font-medium"
              onClick={() => {
                const copy = [...errors]

                copy.splice(index, 1)

                setErrors(copy)
              }}>
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
