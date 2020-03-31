import { WebClient } from '@slack/web-api'

import { to } from '../utils'

class SlackManager {
  private slack: WebClient

  constructor(token: string) {
    this.slack = new WebClient(token)
  }

  async sendMessage(title: string, message: string, receiverId: string) {
    const [err, response] = await to(this.slack.chat.postMessage({
      channel: receiverId,
      text: 'Covid-19 report',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: title
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
    err && console.log(err)
    response && console.log('Message sent successfully!')
  }
}

export default SlackManager
