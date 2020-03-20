import https from 'https'

class CodivDataRetriever {
  private host: string

  constructor() {
    this.host = 'https://api.covid19api.com'
  }

  getSummary(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('RETRIEVING DATA!')
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
          const parsedData = JSON.parse(rawData)
          resolve(parsedData)
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
