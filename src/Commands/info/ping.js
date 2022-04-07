import { Command } from '../../Client'
import { MessageEmbed, Formatters } from 'discord.js'

module.exports = class extends Command {
  constructor() {
    super()
    this.name = 'ping'
    this.description = "mbpr project's Ping"
  }
  execute(interaction) {
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle(`${interaction.client.user.username}'s Latency`)
          .setDescription(
            Formatters.codeBlock('md', `${interaction.client.ws.ping}ms`)
          ),
      ],
    })
  }
}
