import {
  Client,
  Collection,
  Intents,
  CommandInteraction,
  ApplicationCommandType,
  ApplicationCommandOptionData,
} from 'discord.js'
import { readdirSync } from 'fs'
import path from 'path'
import { config } from 'dotenv'

/**
 * @property {string} description
 * @property {ApplicationCommandType | undefined} type
 * @property {ApplicationCommandOptionData[] | undefined} options
 * @property {boolean | undefined} defaultPermission
 * @property {string} name
 */
export class Command {
  constructor() {
    this.name = ''
    this.description = ''
    this.defaultPermission = undefined
    this.type = 'CHAT_INPUT'
    this.options = []
  }

  /**
   *
   * @param interaction {CommandInteraction}
   */
  execute(interaction) {}
}

export class mbprClient extends Client {
  constructor() {
    super({
      intents: [Intents.FLAGS.GUILDS],
    })
    this._commands = new Collection()
    this._commandDirectory = path.join(__dirname, '..', 'Commands')
  }

  /**
   * @private
   */
  _loadCommands() {
    const Directory = readdirSync(path.join(this._commandDirectory))
    for (const Folder of Directory) {
      const Dir2 = readdirSync(`${this._commandDirectory}/${Folder}`)
      for (const File of Dir2) {
        const Temp = require(`${this._commandDirectory}/${Folder}/${File}`)
        const modules = new Temp()
        this._commands.set(modules.name, modules)
        this.once('ready', () => {
          this.application?.commands.create({
            name: modules.name,
            description: modules.description,
            type: modules.type,
            options: modules.options,
            defaultPermission: modules.defaultPermission,
          })
        })
      }
    }
  }

  start() {
    config()
    this.login(process.env.TOKEN)
    this.on('ready', () => {
      console.log(`[Client] ${this.user.username}`)
      console.log('-------------------------')
    })
    this._loadCommands()
    this.on('interactionCreate', interaction => {
      if (interaction.isCommand()) {
        const Command = this._commands.get(interaction.commandName)

        if (!Command) return

        Command.execute(interaction)
      }
    })
  }
}
