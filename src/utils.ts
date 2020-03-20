import { ICountryStatus, CountrySortByPropAllowed } from './types'

export const to = (promise: Promise<any>): Promise<Array<any>> => {
  return promise.then((data: any): Array<any> => {
    return [null, data]
  }).catch((err: object): Array<any> => [err])
}

export const sortCountriesBy = (countries: Array<ICountryStatus>, property: CountrySortByPropAllowed): Array<ICountryStatus> => {
  const countriesSorted: Array<ICountryStatus> = countries.sort((a, b) => {
    if (a[property] < b[property]) {
      return 1
    } else if (a[property] > b[property]) {
      return -1
    }
    return 0
  })
  return countriesSorted
}
