import { ICountryStatus, CountrySortByPropAllowed } from './types'

const EMOJI_FLAGS_MAP = {
  'China': 'flag-cn',
  'Italy': 'flag-it',
  'Spain': 'flag-es',
  'Germany': 'flag-de',
  'Iran': 'flag-ir',
  'US': 'flag-us',
  'France': 'flag-fr',
  'Korea, South': 'flag-kr',
  'Switzerland': 'flag-ch',
  'United Kingdom': 'flag-gb',
  'Netherlands': 'flag-nl',
  'Austria': 'flag-at',
  'Belgium': 'flag-be',
  'Norway': 'flag-no',
  'Sweden': 'flag-se',
  'Denmark': 'flag-dk',
  'Malaysia': 'flag-my',
  'Portugal': 'flag-pt',
  'Japan': 'flag-jp',
  'Canada': 'flag-ca',
  'Czechia': 'flag-cz',
  'Brazil': 'flag-br',
  'Australia': 'flag-au',
  'Israel': 'flag-il',
  'Ireland': 'flag-ir',
  'Pakistan': 'flag-',
  'Greece': 'flag-',
  'Luxembourg': 'flag-',
  'Qatar': 'flag-',
  'Finland': 'flag-',
  'Chile': 'flag-',
  'Poland': 'flag-',
  'Iceland': 'flag-',
  'Singapore': 'flag-',
  'Indonesia': 'flag-',
  'Ecuador': 'flag-',
  'Turkey': 'flag-',
  'Saudi Arabia': 'flag-',
  'Slovenia': 'flag-',
  'Thailand': 'flag-',
  'Romania': 'flag-',
  'Bahrain': 'flag-',
  'Egypt': 'flag-',
  'Estonia': 'flag-',
  'Russia': 'flag-',
  'India': 'flag-',
  'Peru': 'flag-',
  'Philippines': 'flag-',
  'Iraq': 'flag-',
  'South Africa': 'flag-',
  'Mexico': 'flag-',
  'Lebanon': 'flag-',
  'Kuwait': 'flag-',
  'San Marino': 'flag-',
  'United Arab Emirates': 'flag-',
  'Panama': 'flag-',
  'Slovakia': 'flag-',
  'Armenia': 'flag-',
  'Serbia': 'flag-',
  'Taiwan*': 'flag-',
  'Argentina': 'flag-',
  'Colombia': 'flag-',
  'Croatia': 'flag-',
  'Bulgaria': 'flag-',
  'Latvia': 'flag-',
  'Uruguay': 'flag-',
  'Vietnam': 'flag-',
  'Algeria': 'flag-',
  'Bosnia and Herzegovina': 'flag-',
  'Costa Rica': 'flag-',
  'Hungary': 'flag-',
  'Jordan': 'flag-',
  'Brunei': 'flag-',
  'Morocco': 'flag-',
  'Andorra': 'flag-',
  'Sri Lanka': 'flag-',
  'Dominican Republic': 'flag-',
  'Albania': 'flag-',
  'Belarus': 'flag-',
  'Cyprus': 'flag-',
  'North Macedonia': 'flag-',
  'Moldova': 'flag-',
  'Malta': 'flag-',
  'Tunisia': 'flag-',
  'Cambodia': 'flag-',
  'Kazakhstan': 'flag-',
  'Lithuania': 'flag-',
  'Oman': 'flag-',
  'Guadeloupe': 'flag-',
  'Azerbaijan': 'flag-',
  'Georgia': 'flag-',
  'Venezuela': 'flag-',
  'Burkina Faso': 'flag-',
  'New Zealand': 'flag-',
  'Senegal': 'flag-',
  'Uzbekistan': 'flag-',
  'Martinique': 'flag-',
  'Ukraine': 'flag-',
  'Liechtenstein': 'flag-',
  'Reunion': 'flag-',
  'Afghanistan': 'flag-',
  'Honduras': 'flag-',
  'Bangladesh': 'flag-',
  'Cameroon': 'flag-',
  'Congo (Kinshasa)': 'flag-',
  'Rwanda': 'flag-',
  'Cuba': 'flag-',
  'Ghana': 'flag-',
  'Jamaica': 'flag-',
  'Bolivia': 'flag-',
  'French Guiana': 'flag-',
  'Montenegro': 'flag-',
  'Maldives': 'flag-',
  'Paraguay': 'flag-',
  'Guatemala': 'flag-',
  'Mauritius': 'flag-',
  'Nigeria': 'flag-',
  'Monaco': 'flag-',
  'Ethiopia': 'flag-',
  'Togo': 'flag-',
  'Trinidad and Tobago': 'flag-',
  'Guyana': 'flag-',
  'Kenya': 'flag-',
  'Seychelles': 'flag-',
  'Equatorial Guinea': 'flag-',
  'Kyrgyzstan': 'flag-',
  'Mayotte': 'flag-',
  'Mongolia': 'flag-',
  'Tanzania': 'flag-',
  'Barbados': 'flag-',
  'Suriname': 'flag-',
  'Aruba': 'flag-',
  'Bahamas, The': 'flag-',
  'Central African Republic': 'flag-',
  'Congo (Brazzaville)': 'flag-',
  'Gabon': 'flag-',
  'Madagascar': 'flag-',
  'Namibia': 'flag-',
  'Benin': 'flag-',
  'Bhutan': 'flag-',
  'Haiti': 'flag-',
  'Kosovo': 'flag-',
  'Liberia': 'flag-',
  'Mauritania': 'flag-',
  'Saint Lucia': 'flag-',
  'Sudan': 'flag-',
  'Zambia': 'flag-',
  'Angola': 'flag-',
  'Antigua and Barbuda': 'flag-',
  'Cabo Verde': 'flag-',
  'Chad': 'flag-',
  'Djibouti': 'flag-',
  'El Salvador': 'flag-',
  'Eswatini': 'flag-',
  'Fiji': 'flag-',
  'Gambia, The': 'flag-',
  'Guinea': 'flag-',
  'Holy See': 'flag-',
  'Nepal': 'flag-',
  'Nicaragua': 'flag-',
  'Niger': 'flag-',
  'Papua New Guinea': 'flag-',
  'Saint Vincent and the Grenadines': 'flag-',
  'Somalia': 'flag-',
  'Zimbabwe': 'flag-',
  'Greenland': 'flag-',
  'Guam': 'flag-',
  'Guernsey': 'flag-',
  'Jersey': 'flag-',
  'occupied Palestinian territory': 'flag-',
  'Puerto Rico': 'flag-',
  'Republic of the Congo': 'flag-',
  'The Bahamas': 'flag-',
  'The Gambia': 'flag-'
}

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
