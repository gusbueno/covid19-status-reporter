import express from 'express'
import dotenv from 'dotenv'
import cron from 'cron'

dotenv.config() // load it before import classes

import CovidDataRetriever from './CovidDataRetriever'
import SlackManager from './SlackManager'
import { to, formatMessage } from './utils'



const PORT: string = process.env.PORT || '3000'
const TIMEZONE: string = process.env.TIMEZONE || 'Europe/Madrid'
const CRON_PATTERN: string = process.env.CRON_PATTERN || '*/5 * * * * *'
const SLACK_API_TOKEN: string = process.env.SLACK_API_TOKEN || ''
const SLACK_CHANNEL: string = process.env.SLACK_CHANNEL || ''

const app = express()
const covidDataRetriever: CovidDataRetriever = new CovidDataRetriever()
const slackManager: SlackManager = new SlackManager(SLACK_API_TOKEN, SLACK_CHANNEL)

const executeJob = async () => {
  const [err, data] = await to(covidDataRetriever.getSummary(10))
  err && process.exit(1)


  slackManager.sendMessage(formatMessage(data))
}

const job = new cron.CronJob(CRON_PATTERN, executeJob, null, true, TIMEZONE)

app.listen(PORT, () => {
  job.start()
  console.log(`server started at http://localhost:${ PORT }`)
})
