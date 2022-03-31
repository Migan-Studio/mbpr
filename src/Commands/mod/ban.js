import { Command } from '../../Client'
import { MessageEmbed, Permissions } from 'discord.js'

module.exports = class extends Command {
  constructor() {
    super()
    this.name = 'ban'
    this.description = "mbpr project's ban"
    this.options = [
      {
        type: 'USER',
        name: 'member',
        description: 'member',
        required: true,
      },
      {
        type: 'STRING',
        name: 'reason',
        description: 'ban reason',
        required: false,
      },
    ]
  }
  execute(interaction) {
    let member = interaction.options.getMember('member')
    if (interaction.channel.type === 'DM')
      return interaction.reply({
        content: "Can't Using the DM.",
        ephemeral: true,
      })
    if (
      !interaction.guild.members.cache
        .get(interaction.user.id)
        .permissions.has(Permissions.FLAGS.KICK_MEMBERS)
    )
      return interaction.reply({
        content: 'You not have permissions has `Ban Members`.',
        ephemeral: true,
      })
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
      return interaction.reply({
        content: "i'm not have permissions has `Ban Members`.",
        ephemeral: true,
      })

    try {
      member.ban({
        reason: interaction.options.getString('reason') || 'None',
      })
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle('Ban')
            .setDescription(`Member ${member.user.tag} has been baned.`)
            .setTimestamp(),
        ],
        ephemeral: true,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
