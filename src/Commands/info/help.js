import { Command } from '../../Client'

module.exports = class extends Command {
  constructor() {
    super()
    this.name = 'help'
    this.description = 'asdf'
  }
  execute(interaction) {
    interaction.reply('a')
  }
}
