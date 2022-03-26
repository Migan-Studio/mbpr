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
 * @property {ApplicationCommandOptionData[]} options
 * @property {boolean} defaultPermission
 * @property {string} name
 */
export class Command {
  constructor(option = {}) {
    const { name, description, defaultPermission, type, options } = option
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
  }

  /**
   * @private
   */
  _loadCommands() {
    const Directory = readdirSync(path.join(__dirname, '..', 'Commands'))

    for (const Folders of Directory) {
      const FolderDirectory = readdirSync(`${__dirname}/../Commands/${Folders}`)
      for (const Files of FolderDirectory) {
        let Command = require(`${__dirname}/../Commands/${Folders}/${Files}`)
        Command = new Command()
        this._commands.set(Command.name, Command)
        this.once('ready', () => {
          this.application.commands.create({
            name: Command.name,
            description: Command.description,
            type: Command.type,
            options: Command.options,
            defaultPermission: Command.defaultPermission,
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
     this.on('interactionCreate', async interaction => {
      if (interaction.isCommand()) {
        const Command = this._commands.get(interaction.commandName)

        if (!Command) return

        await Command.execute(interaction)
      }
    })
  }
}
