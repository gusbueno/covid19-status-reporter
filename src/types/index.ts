export interface ICountryStatus {
  Country: string,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  TotalRecovered: number
}

export interface ISummaryResponse {
  Countries: Array<ICountryStatus>,
  Date: string
}

export enum CountrySortByPropAllowed {
  TotalConfirmed = 'TotalConfirmed',
  NewDeaths = 'NewDeaths',
  TotalDeaths = 'TotalDeaths',
  TotalRecovered = 'TotalRecovered'
}
