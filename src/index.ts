import express from 'express'
import dotenv from 'dotenv'
import cron from 'cron'

dotenv.config() // load it before import classes

import { ICountryStatus } from './types'
import CovidDataRetriever from './CovidDataRetriever'
import SlackManager from './SlackManager'
import { to, formatMessageCountries, dateFormatted } from './utils'
import slackConfig from '../slack_config.json'
import { TOP10_COUNTRIES, CUSTOM_COUNTRIES } from './constants'

const PORT: string = process.env.PORT || '3000'
const TIMEZONE: string = process.env.TIMEZONE || 'Europe/Madrid'
const SLACK_API_TOKEN: string = process.env.SLACK_API_TOKEN || ''
const CRON_PATTERN: string = process.env.CRON_PATTERN || '*/5 * * * * *'

const app = express()
const covidDataRetriever: CovidDataRetriever = new CovidDataRetriever()
const slackManager: SlackManager = new SlackManager(SLACK_API_TOKEN)

const top10Countries = async (receiver: string) => {
  const [err, data] = await to(covidDataRetriever.getSummary(10))
  err && console.log(err)

  if (data) {
    const title: string = `*Covid-19 Report [${dateFormatted()}]: TOP 10 countries*`
    const message: string = formatMessageCountries(data)
    slackManager.sendMessage(title, message, receiver)
  }
}

const customCountries = async (receiver: string, countries: Array<string>) => {
  const [err, data] = await to(covidDataRetriever.getSummary())
  err && console.log(err)

  if(data) {
    const countriesFiltered = data.filter((country: ICountryStatus) => {
      return countries.includes(country.Slug)
    })
    const title: string = `*Covid-19 Report [${dateFormatted()}]: Custom country list*`
    const message: string = formatMessageCountries(countriesFiltered)
    slackManager.sendMessage(title, message, receiver)
  }
}

const readSlackConfigFile = () => {
  Object.keys(slackConfig).forEach(async (key: string) => {
    switch (slackConfig[key].type) {
      case TOP10_COUNTRIES:
        top10Countries(key)
        break
      case CUSTOM_COUNTRIES:
        const countries: Array<string> = [...slackConfig[key].countries]
        customCountries(key, countries)
        break
      default:
        console.log(`Unsupported type: ${slackConfig[key].type}`)
        break
    }
  })
}

const job = new cron.CronJob(CRON_PATTERN, readSlackConfigFile, null, true, TIMEZONE)

app.listen(PORT, () => {
  job.start()
  console.log(`server started at http://localhost:${ PORT }`)
})
