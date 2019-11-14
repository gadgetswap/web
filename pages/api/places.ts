import cities from 'cities.json'
import { getName } from 'country-list'
import Fuse from 'fuse.js'
import { NextApiRequest, NextApiResponse } from 'next'

import { City, Place } from '../../types'

class Places {
  fuse = new Fuse(
    (cities as City[]).map((city: City) => ({
      ...city,
      country: getName(city.country)
    })),
    {
      keys: ['country', 'name']
    }
  )

  search(query: string): Place[] {
    return this.fuse
      .search(query)
      .slice(0, 3)
      .map(({ country, name }) => ({
        city: name,
        country
      }))
  }
}

const places = new Places()

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query

  const cities = places.search(query as string)

  res.send(cities)
}
