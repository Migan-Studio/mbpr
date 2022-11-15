import { Client, GatewayIntentBits, Partials } from 'discord.js'
import { CommandHandler, LoadType } from '../../modules/CommandHandler/src'
import path from 'path'
import { config } from 'dotenv'

declare module 'discord.js' {
  interface Client {
    cmd: CommandHandler
    start(): void
  }
}

export class MbprClient extends Client {
  public constructor() {
    super({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] })
  }

  public cmd: CommandHandler = new CommandHandler(this, {
    loadType: LoadType.Folder,
    directory: path.join(__dirname, '..', 'Commands'),
  })

  public start(): void {
    config()
    this.login(process.env.TOKEN)
    console.info('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    console.info('@@ THIS IS USE LICENCE IS MIT. @@')
    console.info('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    console.log(' ')
    this.cmd.loadAll()
    this.once('ready', () => {
      console.log(`[MbprClient] Bot name: ${this.user!.username}`)
      console.log('-------------------------')
    })
  }
}
