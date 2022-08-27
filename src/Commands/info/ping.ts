import { Command } from 'mbpr-commandhandler'
import {
  EmbedBuilder,
  codeBlock,
  ChatInputCommandInteraction,
} from 'discord.js'

export = class extends Command {
  name = 'ping'
  description = "mbpr project's Ping"
  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle(`${interaction.client.user!.username}'s Latency`)
          .setDescription(codeBlock('md', `${interaction.client.ws.ping}ms`)),
      ],
    })
  }
}
