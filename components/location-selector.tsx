import Head from 'next/head'
import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'

import { colors } from '../assets/styles'
import { useDebounce } from '../hooks'
import { places } from '../lib'
import { Place } from '../types'
import { Spinner } from './spinner'

const Main = styled.div`
  position: relative;
`

const Results = styled.ul`
  background: ${colors.backgroundDark};
  border-radius: 0.25em;
  margin: -1em 0 0;
  min-height: 3em;
  position: absolute;
  width: 20em;
  z-index: 1;

  &:before {
    border-bottom: 0.5em solid ${colors.backgroundDark};
    border-left: 0.5em solid transparent;
    border-right: 0.5em solid transparent;
    bottom: 100%;
    content: '';
    height: 0;
    left: 2em;
    position: absolute;
    width: 0;
  }

  div {
    margin: 1em auto;
  }

  p {
    line-height: 1;
    margin: 1em;
  }

  li {
    cursor: pointer;
    line-height: 1;
    list-style: none;
    margin: 0;
    padding: 1em;
    transition: 0.2s;

    &:hover {
      font-weight: 500;
    }
  }
`

interface Props {
  disabled?: boolean
  placeholder?: string

  onChange: (place: Place) => void
}

export const LocationSelector: FunctionComponent<Props> = ({
  disabled,
  placeholder,
  onChange
}) => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Place[]>([])
  const [selected, setSelected] = useState('')

  const debounced = useDebounce(query, 300)

  useEffect(() => {
    if (debounced && debounced !== selected) {
      setLoading(true)

      places
        .search(debounced)
        .then(results => setResults(results))
        .finally(() => setLoading(false))
    }
  }, [debounced])

  return (
    <Main>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_KEY}&libraries=places`}></script>
      </Head>
      <label>
        <span>{placeholder || 'Location'}</span>
        <input
          disabled={disabled}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search"
          value={query}
        />
      </label>
      {query.length > 0 && query !== selected && (
        <Results>
          {loading && <Spinner dark />}
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => {
                const { city, country } = result

                setQuery(`${city}, ${country}`)
                setSelected(`${city}, ${country}`)

                onChange(result)
              }}>
              {result.city}, {result.country}
            </li>
          ))}
          {!loading && query === debounced && results.length === 0 && (
            <p>Nothing found</p>
          )}
        </Results>
      )}
    </Main>
  )
}
