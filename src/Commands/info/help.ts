import { Command } from '../../Client'
import { Formatters, CommandInteraction, MessageEmbed } from 'discord.js'

export = class extends Command {
  name = 'help'
  description = "mbpr project's Help"

  execute(interaction: CommandInteraction) {
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle(`${interaction.client.user!.username}'s Help`)
          .setDescription(
            Formatters.codeBlock(
              'md',
              `# info
- help

# mod
- kick
- ban
- clean`
            )
          ),
      ],
    })
  }
}
