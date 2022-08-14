import { GatewayIntentBits } from 'discord.js'
import { DiscommandClient } from 'discommand'
import { config } from 'dotenv'
import path from 'path'

declare module 'discord.js' {
  interface Client {
    DiscommandClientOptions: {
      CommandHandlerDirectory: string
      ListenerDirectory?: string
      loadType: 'FILE' | 'FOLDER'
    }
    loadAll(): void
  }
}

export class mbprClient extends DiscommandClient {
  constructor() {
    super(
      {
        intents: [GatewayIntentBits.Guilds],
      },
      {
        CommandHandlerDirectory: path.join(__dirname, '..', 'Commands'),
        loadType: 'FOLDER',
      }
    )
  }

  start() {
    process.on('uncaughtException', console.error)
    console.info('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    console.info('@@ This project licence is MIT. @@')
    console.info('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    console.log(' ')
    config()
    this.login(process.env.TOKEN)
    this.once('ready', () => {
      console.log(`[MbprClient] Bot Name: ${this.user!.username}`)
      console.log('-------------------------')
    })
    this.loadAll()
  }
}
