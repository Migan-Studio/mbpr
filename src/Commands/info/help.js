import { Command } from '../../Client'

module.exports = class extends Command {
  constructor() {
    super({ name: 'help', description: 'asdf' })
  }
  execute(interaction) {
    interaction.reply('a')
  }
}
