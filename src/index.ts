import express from 'express'
import dotenv from 'dotenv'
import cron from 'cron'

import CovidDataRetriever from './CovidDataRetriever'
import { to } from './utils'

const PORT: string = process.env.PORT || '3000'
const TIMEZONE: string = process.env.TIMEZONE || 'Europe/Madrid'
const CRON_PATTERN: string = process.env.CRON_PATTERN || '*/5 * * * * *'

dotenv.config()
const app = express()

const covidDataRetriever: CovidDataRetriever = new CovidDataRetriever()

const executeJob = async () => {
  const [err, data] = await to(covidDataRetriever.getSummary())
  err && process.exit(1)
  console.log(data)
}

const job = new cron.CronJob(CRON_PATTERN, executeJob, null, true, TIMEZONE)

app.listen(PORT, () => {
  job.start()
  console.log(`server started at http://localhost:${ PORT }`)
})
