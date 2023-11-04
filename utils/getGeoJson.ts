import { RockData } from '../services/rocks'

export const getGeoJson = (rocks: RockData[]) => rocks.map(rock => (
  {
    "type": "Feature",
    "properties": {
      "cluster": false,
      "id": rock.attributes.uuid,
      "category": "rock"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [rock.attributes.coordinates.latitude, rock.attributes.coordinates.longitude]
    }
  }
))