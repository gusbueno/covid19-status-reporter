import https from 'https'

import { sortCountriesBy } from './utils'
import { ISummaryResponse, ICountryStatus, CountrySortByPropAllowed } from './types'

class CodivDataRetriever {
  private host: string

  constructor() {
    this.host = 'https://api.covid19api.com'
  }

  getSummary(): Promise<any> {
    return new Promise((resolve, reject) => {
      https.get(`${this.host}/summary`, res => {
        if (res.statusCode !== 200) {
          reject()
          process.exit(1)
        }
  
        let rawData = ''
        res.on('data', data => {
          rawData += data
        })
  
        res.on('end', () => {
          const parsedData: ISummaryResponse = JSON.parse(rawData)
          const countriesSorted: Array<ICountryStatus> = sortCountriesBy(parsedData.Countries, CountrySortByPropAllowed.TotalConfirmed)
          resolve(countriesSorted)
        })
      })
      .on('error', err => {
        console.log(err)
        reject()
      })
    })
    
  }


}

export default CodivDataRetriever
