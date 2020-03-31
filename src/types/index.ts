export interface ICountryStatus {
  Country: string,
  Slug: string,
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number
}

export interface ISummaryResponse {
  Countries: Array<ICountryStatus>,
  Date: string
}

export enum CountrySortByPropAllowed {
  NewConfirmed = 'NewConfirmed',
  TotalConfirmed = 'TotalConfirmed',
  NewDeaths = 'NewDeaths',
  TotalDeaths = 'TotalDeaths',
  NewRecovered = 'NewRecovered',
  TotalRecovered = 'TotalRecovered'
}
