import { Command } from '../../Client'
import { Formatters, MessageEmbed } from 'discord.js'

module.exports = class extends Command {
  constructor() {
    super()
    this.name = 'help'
    this.description = "mbpr project's Help"
  }

  execute(interaction) {
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle(`${interaction.client.user.username}'s Help`)
          .setDescription(
            Formatters.codeBlock(
              'md',
              `# info
- help

# mod
- kick
- ban`
            )
          ),
      ],
    })
  }
}
