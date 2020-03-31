import { ICountryStatus, CountrySortByPropAllowed } from './types'
import { EMOJI_FLAGS_MAP, REPEATED_COUNTRIES } from './constants'

export const to = (promise: Promise<any>): Promise<Array<any>> => {
  return promise.then((data: any): Array<any> => {
    return [null, data]
  }).catch((err: object): Array<any> => [err])
}

export const removeRepeatedCountries = (countries: Array<ICountryStatus>): Array<ICountryStatus> => {
  return countries.filter((country: ICountryStatus) => !REPEATED_COUNTRIES.includes(country.Country))
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

export const dateFormatted = (): string => {
  const date: Date = new Date()
  const year: number = date.getFullYear()
  const month: number | string = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day: number | string = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() 
  return `${year}-${month}-${day}`
}

export const formatMessageCountries = (data: Array<ICountryStatus>): string => {
  let messageFormatted: string = ''
  data.forEach((country: ICountryStatus, index: number) => {
    messageFormatted += `
${index+1}. Country: *${country.Country}* :${EMOJI_FLAGS_MAP[country.Country] ? EMOJI_FLAGS_MAP[country.Country] : 'question'}:
  - Total confirmed: *${country.TotalConfirmed}* (+${country.NewConfirmed})
  - Total deaths: *${country.TotalDeaths}* (+${country.NewDeaths})
  - Total recovered: *${country.TotalRecovered}* (+${country.NewRecovered})
  `
  })
  return messageFormatted
}
