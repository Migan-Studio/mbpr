import { GatewayIntentBits } from 'discord.js'
import path from 'path'
import { config } from 'dotenv'
import { DiscommandClient } from 'discommand'

declare module 'discord.js' {
  interface Client {
    DiscommandClientOptions: {
      loadType: 'FILE' | 'FOLDER'
      CommandHandlerDirectory: string
      ListenerDirectory?: string
    }
  }
}

export class mbprClient extends DiscommandClient {
  constructor() {
    super(
      {
        intents: [GatewayIntentBits.Guilds],
      },
      {
        loadType: 'FOLDER',
        CommandHandlerDirectory: path.join(__dirname, '..', 'Commands'),
      }
    )
  }

  start() {
    console.info('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    console.info('@@ THIS IS USE LICENCE IS MIT. @@')
    console.info('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    console.log(' ')
    config()
    this.login(process.env.TOKEN)
    this.once('ready', () => {
      console.log(`[MbprClient] ${this.user!.username}`)
      console.log('-------------------------')
    })
    this.loadAll()
  }
}
