import { Command } from 'mbpr-commandhandler'
import {
  codeBlock,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js'

export = class extends Command {
  name = 'help'
  description = "mbpr project's Help"

  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${interaction.client.user!.username}'s Help`)
          .setDescription(
            codeBlock(
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
