import Head from 'next/head'
import React, { FunctionComponent, useEffect, useState } from 'react'

import { useDebounce } from '../hooks'
import { places } from '../lib'
import { Place } from '../types'
import { Spinner } from './spinner'

interface Props {
  disabled?: boolean
  placeholder?: string
  required?: boolean

  onChange: (place: Place) => void
}

export const LocationSelector: FunctionComponent<Props> = ({
  disabled,
  placeholder,
  required,
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
    <>
      <div className="relative">
        <Head>
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_KEY}&libraries=places`}></script>
        </Head>
        <label>
          <span>{placeholder || 'Location'}</span>
          <input
            className="w-full"
            disabled={disabled}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search"
            required={required}
            value={query}
          />
        </label>
        {query.length > 0 && query !== selected && (
          <ul className="bg-gray-300 rounded -mt-4 absolute w-full lg:w-100 z-10 before:border-gray-300">
            {loading && <Spinner className="my-4 mx-auto" />}
            {results.map((result, index) => (
              <li
                key={index}
                className="p-4 cursor-pointer hover:bg-gray-400"
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
              <div className="p-4 text-red-500 font-medium">Nothing found</div>
            )}
          </ul>
        )}
      </div>

      <style jsx>{`
        ul:empty:before {
          display: none;
        }

        ul:before {
          border-bottom-style: solid;
          border-bottom-width: 0.5em;
          border-left: 0.5em solid transparent;
          border-right: 0.5em solid transparent;
          bottom: 100%;
          content: '';
          height: 0;
          left: 2em;
          position: absolute;
          width: 0;
        }

        li {
          transition: 0.2s;
        }

        li:first-child {
          border-top-left-radius: 0.25rem;
          border-top-right-radius: 0.25rem;
        }

        li:last-child {
          border-bottom-left-radius: 0.25rem;
          border-bottom-right-radius: 0.25rem;
        }
      `}</style>
    </>
  )
}
