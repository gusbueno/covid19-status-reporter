import express from 'express'
import dotenv from 'dotenv'

const PORT: number = 3000

dotenv.config()
const app = express()

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${ PORT }`)
})
