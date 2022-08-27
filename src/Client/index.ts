import { GatewayIntentBits, Client } from 'discord.js'
import path from 'path'
import { config } from 'dotenv'
import { CommandHandler, LoadType } from 'mbpr-commandhandler'

declare module 'discord.js' {
  interface Client {
    cmd: CommandHandler
  }
}

export class mbprClient extends Client {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds],
    })
  }

  public cmd: CommandHandler = new CommandHandler(this, {
    loadType: LoadType.Folder,
    directory: path.join(__dirname, '..', 'Commands'),
  })

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
    this.cmd.loadAll()
  }
}
