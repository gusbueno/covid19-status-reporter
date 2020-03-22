import { WebClient } from '@slack/web-api'

import { to, dateFormatted } from '../utils'

class SlackManager {
  private slack: WebClient
  private channel: string

  constructor(token: string, channel: string) {
    this.slack = new WebClient(token) 
    this.channel = channel
  }

  async sendMessage(message: any) {
    const [err, response] = await to(this.slack.chat.postMessage({
      channel: this.channel,
      text: 'Covid-19 report',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Covid-19 Report [${dateFormatted()}]: TOP 10 countries*`
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message
          }
        }
      ],
      username: 'Covid19Reporter'
    }))
    err && process.exit(1)
    response && console.log('Message sent successfully!')
  }
}

export default SlackManager
