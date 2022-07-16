import { Command } from '../../Client'
import { MessageEmbed, Formatters, CommandInteraction } from 'discord.js'

export = class extends Command {
  name = 'ping'
  description = "mbpr project's Ping"
  execute(interaction: CommandInteraction) {
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle(`${interaction.client.user!.username}'s Latency`)
          .setDescription(
            Formatters.codeBlock('md', `${interaction.client.ws.ping}ms`)
          ),
      ],
    })
  }
}
