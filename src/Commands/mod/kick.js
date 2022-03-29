import { Command } from '../../Client'
import { MessageEmbed, Permissions } from 'discord.js'

module.exports = class extends Command {
  constructor() {
    super()
    this.name = 'kick'
    this.description = "mbpr project's Kick"
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
        description: 'kick reason',
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
        content: 'You not have permissions has `Kick Members`.',
      })
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
      return interaction.reply({
        content: "i'm not have permissions has `Kick Members`.",
      })

    try {
      member.kick(interaction.options.getString('reason') || 'None')
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle('Kick')
            .setDescription(`Member ${member.user.tag} has been kicked.`)
            .setTimestamp(),
        ],
      })
    } catch (error) {
      console.log(error)
    }
  }
}
