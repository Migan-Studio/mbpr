import { MessageEmbed, Permissions } from 'discord.js'
import { Command } from '../../Client'

module.exports = class extends Command {
  constructor() {
    super()
    this.name = 'clean'
    this.description = 'Clean the chat room.'
    this.options = [
      {
        type: 'NUMBER',
        name: 'limit',
        description: 'limit',
        required: true,
        minValue: 1,
        maxValue: 100,
      },
    ]
  }

  execute(interaction) {
    if (interaction.channel.type === 'DM')
      return interaction.reply({
        content: "Can't Using the DM.",
        ephemeral: true,
      })
    if (
      !interaction.guild.members.cache
        .get(interaction.user.id)
        .permissions.has(
          Permissions.FLAGS.MANAGE_MESSAGES || Permissions.FLAGS.ADMINISTRATOR
        )
    )
      return interaction.reply({
        content: 'You not have permissions has `Manage Messages`.',
        ephemeral: true,
      })
    if (
      !interaction.guild.me.permissions.has(
        Permissions.FLAGS.MANAGE_MESSAGES || Permissions.FLAGS.ADMINISTRATOR
      )
    )
      return interaction.reply({
        content: "i'm not have permissions gas `Manage Messages`.",
        ephemeral: true,
      })
    interaction.channel?.messages
      .fetch({
        limit: interaction.options.getNumber('limit'),
      })
      .then(messages => {
        interaction.guild?.channels.fetch(interaction.channelId).then(a => {
          a.bulkDelete(messages, true)
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setTitle('clean')
                .setDescription(
                  `${interaction.options.getNumber(
                    'limit'
                  )} chat(s) have been deleted.`
                ),
            ],
          })
        })
      })
      .catch(error => console.log(error))
  }
}
