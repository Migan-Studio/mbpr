import { type Client, Collection, InteractionType } from 'discord.js'
import { readdirSync } from 'fs'
import { Command, type Options, LoadType } from '.'

export class CommandHandler {
  client: Client
  options: Options
  public constructor(client: Client, options: Options) {
    this.client = client
    this.options = options
  }

  public modules: Collection<string, Command> = new Collection()

  /**
   *
   * @private
   */
  private register(modules: Command) {
    console.info(`[discommand-lite] Command ${modules.name} is Loaded.`)
    this.modules.set(modules.name, modules)
    this.client.once('ready', () => {
      this.client.application?.commands.create({
        name: modules.name,
        nameLocalizations: modules.nameLocalizations,
        description: modules.description,
        descriptionLocalizations: modules.descriptionLocalizations,
        defaultPermission: modules.defaultPermission,
        // @ts-ignore
        type: modules.type,
        // @ts-ignore
        options: modules.options,
      })
    })
  }

  public loadAll() {
    const dir = readdirSync(this.options.directory)

    if (this.options.loadType === LoadType.File) {
      for (const file of dir) {
        const tempModules = require(`${this.options.directory}/${file}`)
        let modules
        if (!tempModules.default) {
          modules = new tempModules()
        } else {
          modules = new tempModules.default()
        }
        this.register(modules)
      }
    } else if (this.options.loadType === LoadType.Folder) {
      for (const folder of dir) {
        const folderDir = readdirSync(`${this.options.directory}/${folder}`)
        for (const file of folderDir) {
          const tempModules = require(`${this.options.directory}/${folder}/${file}`)
          let modules
          if (!tempModules.default) {
            modules = new tempModules()
          } else {
            modules = new tempModules.default()
          }
          this.register(modules)
        }
      }
    }

    this.client.on('interactionCreate', async interaction => {
      if (interaction.type === InteractionType.ApplicationCommand) {
        if (interaction.isChatInputCommand()) {
          const command = this.modules.get(interaction.commandName)

          if (!command) return

          try {
            await command.execute(interaction)
          } catch (error) {
            console.error(error)
          }
        }
      }
    })
  }
}
