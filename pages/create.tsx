import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import nanoid from 'nanoid'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'

import {
  Footer,
  FormMessage,
  Header,
  ImagePicker,
  LocationSelector,
  Spinner
} from '../components'
import { redirect, s3 } from '../lib'
import { Place } from '../types'
import { Gadget, MutationCreateGadgetArgs } from '../types/graphql'

const CREATE_GADGET = gql`
  mutation createGadget(
    $data: CreateGadgetInput!
    $location: CreateLocationInput!
  ) {
    createGadget(data: $data, location: $location) {
      id
      title
      description
      location {
        city
        country
      }
      images
      quantity
      createdAt
    }
  }
`

interface Props {
  token: string
}

const Create: NextPage<Props> = ({ token }) => {
  const [location, setLocation] = useState<Place>()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [images, setImages] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const [createGadget, { error, loading }] = useMutation<
    {
      createGadget: Gadget
    },
    MutationCreateGadgetArgs
  >(CREATE_GADGET, {
    onCompleted({ createGadget: { id } }) {
      Router.push(`/gadgets/${id}`)
    }
  })

  const create = async () => {
    if (!title || !description) {
      return
    }

    setUploading(true)

    const urls = await Promise.all(
      images.map(image => s3.upload(`images/${nanoid()}`, image))
    )

    setUploading(false)

    createGadget({
      variables: {
        data: {
          description,
          images: urls.map(url => url.split('/').pop()),
          quantity,
          title
        },
        location
      }
    })
  }

  return (
    <>
      <Head>
        <title>Post / GadgetSwap</title>
      </Head>

      <Header loggedIn={!!token} />

      <main className="flex flex-col">
        <h1 className="text-5xl	font-semibold">Post gadget</h1>
        <form
          onSubmit={event => {
            event.preventDefault()

            create()
          }}>
          {error && <FormMessage message={error.message} type="error" />}
          <div className="flex my-8 flex-col lg:flex-row">
            <section className="flex-1">
              <h3 className="text-3xl font-semibold mb-8">Location</h3>
              <LocationSelector
                disabled={loading || uploading}
                placeholder="Pick your city"
                onChange={location => setLocation(location)}
              />
            </section>
            <section className="flex-1 lg:ml-8">
              <h3 className="text-3xl font-semibold mb-8">Details</h3>
              <label>
                <span>Catchy title</span>
                <input
                  className="w-full"
                  disabled={loading || uploading}
                  onChange={event => setTitle(event.target.value)}
                  placeholder="Title"
                  required
                  type="text"
                  value={title}
                />
              </label>
              <label>
                <span>
                  Describe the condition of your gadget and what you want in
                  return for it
                </span>
                <textarea
                  className="w-full"
                  disabled={loading || uploading}
                  onChange={event => setDescription(event.target.value)}
                  placeholder="Description"
                  required
                  value={description}
                />
              </label>
              <label>
                <span>How many gadgets do you have?</span>
                <input
                  className="w-full"
                  disabled={loading || uploading}
                  max={5}
                  min={1}
                  onChange={event => setQuantity(Number(event.target.value))}
                  placeholder="Quantity"
                  required
                  type="number"
                  value={quantity}
                />
              </label>
            </section>
            <section className="flex-1 lg:ml-8">
              <h3 className="text-3xl font-semibold mb-8">Images</h3>
              <ImagePicker
                disabled={loading || uploading}
                onAdd={next => setImages([...images, ...next])}
                onRemove={index => {
                  const copy = [...images]

                  copy.splice(index, 1)

                  setImages(copy)
                }}
              />
            </section>
          </div>
          <footer className="self-start">
            {loading || uploading ? <Spinner /> : <button>Post</button>}
          </footer>
        </form>
      </main>

      <Footer />
    </>
  )
}

Create.getInitialProps = async context => {
  const { token } = parseCookies(context)

  if (!token) {
    redirect(context, '/')
  }

  return {
    token
  }
}

export default Create
