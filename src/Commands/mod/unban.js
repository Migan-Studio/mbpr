import { MessageEmbed, Permissions } from 'discord.js'
import { Command } from '../../Client'

module.exports = class extends Command {
  constructor() {
    super()
    this.name = 'unban'
    this.description = "mbpr project's Unban."
    this.options = [
      {
        type: 'STRING',
        name: 'id',
        description: "The unban member's ID.",
        required: true,
      },
    ]
  }
  execute(interaction) {
    if (
      !interaction.guild.members.cache
        .get(interaction.user.id)
        .permissions.has(Permissions.FLAGS.BAN_MEMBERS)
    )
      return interaction.reply({
        content: 'You not have permissions has `Ban Members`.',
        ephemeral: true,
      })
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
      return interaction.reply({
        content: "i'm not have permissions has `Ban Members`.",
        ephemeral: true,
      })
    if (isNaN(interaction.options.getString('id')))
      return interaction.reply({
        content: '`id` is String.',
        ephemeral: true,
      })
    interaction.guild.members
      .unban(interaction.options.getString('id'))
      .then(() => {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setTitle('unban')
              .setDescription('The member has been unbaned.')
              .setTimestamp(),
          ],
        })
      })
      .catch(error => {
        interaction.reply({
          content: "I can't unban the member.",
          ephemeral: true,
        })
        console.log(error)
      })
  }
}
