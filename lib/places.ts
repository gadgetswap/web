import { Place } from '../types'

class Places {
  service: google.maps.places.PlacesService

  search(query: string): Promise<Place[]> {
    if (!this.service) {
      this.service = new google.maps.places.PlacesService(
        document.createElement('div')
      )
    }

    return new Promise(resolve =>
      this.service.findPlaceFromQuery(
        {
          fields: ['formatted_address', 'types'],
          query
        },
        (results, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return resolve([])
          }

          const data = results
            .map(({ formatted_address, types }) => {
              if (types.includes('locality')) {
                const parts = formatted_address
                  .split('-')
                  .join(',')
                  .split(',')

                return {
                  city: parts.shift().trim(),
                  country: parts.pop().trim()
                }
              }
            })
            .filter(Boolean)

          resolve(data)
        }
      )
    )
  }
}

export const places = new Places()
