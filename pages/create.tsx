import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import nanoid from 'nanoid'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'

import {
  Button,
  Footer,
  FormMessage,
  Header,
  ImagePicker,
  LocationSelector
} from '../components'
import { redirect, s3, withAuth } from '../lib'
import { Place } from '../types'
import { Gadget, MutationCreateGadgetArgs, User } from '../types/graphql'

const Main = styled.main`
  display: flex;
  flex-direction: column;

  button {
    align-self: flex-start;
  }
`

const Form = styled.form`
  display: flex;
  flex: 1;

  section {
    flex: 1;

    &:not(:first-child) {
      margin-left: 2em;
    }

    h3 {
      margin-top: 0;
    }

    label {
      input,
      textarea {
        width: 100%;
      }
    }
  }
`

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
  user: User
}

const Create: NextPage<Props> = ({ user }) => {
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

      <Header user={user} />

      <Main>
        <h1>Post your gadget</h1>
        {error && <FormMessage message={error.message} type="error" />}
        <Form
          onSubmit={event => {
            event.preventDefault()

            create()
          }}>
          <section>
            <h3>Location</h3>
            <LocationSelector
              disabled={loading || uploading}
              placeholder="Pick your city"
              onChange={location => setLocation(location)}
            />
          </section>
          <section>
            <h3>Details</h3>
            <label>
              <span>Catchy title</span>
              <input
                disabled={loading || uploading}
                onChange={event => setTitle(event.target.value)}
                placeholder="Title"
                required
                type="text"
                value={title}
              />
            </label>
            <label>
              <span>Describe the condition and what you want in return</span>
              <textarea
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
          <section>
            <h3>Images</h3>
            <ImagePicker
              disabled={loading || uploading}
              onChange={images => setImages(images)}
              onRemove={index => {
                const copy = [...images]

                copy.splice(index, 1)

                setImages(copy)
              }}
            />
          </section>
        </Form>
        <Button loading={loading || uploading} onClick={create}>
          Post
        </Button>
      </Main>

      <Footer />
    </>
  )
}

Create.getInitialProps = async context => {
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  if (!user) {
    redirect(context, '/')
  }

  return {
    user
  }
}

export default Create
