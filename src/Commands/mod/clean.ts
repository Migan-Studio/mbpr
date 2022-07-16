import {
  ApplicationCommandOptionData,
  CommandInteraction,
  MessageEmbed,
  Permissions,
} from 'discord.js'
import { Command } from '../../Client'

export = class extends Command {
  name = 'clean'
  description = 'Clean the chat room.'
  options: ApplicationCommandOptionData[] = [
    {
      type: 'NUMBER',
      name: 'limit',
      description: 'limit',
      required: true,
      minValue: 1,
      maxValue: 100,
    },
  ]

  async execute(interaction: CommandInteraction) {
    if (interaction.channel!.type === 'DM')
      return interaction.reply({
        content: "Can't Using the DM.",
        ephemeral: true,
      })
    if (
      !interaction
        .guild!.members!.cache.get(interaction.user.id)!
        .permissions.has(
          Permissions.FLAGS.MANAGE_MESSAGES || Permissions.FLAGS.ADMINISTRATOR
        )
    )
      return interaction.reply({
        content: 'You not have permissions has `Manage Messages`.',
        ephemeral: true,
      })
    if (
      !interaction.guild!.me!.permissions.has(
        Permissions.FLAGS.MANAGE_MESSAGES || Permissions.FLAGS.ADMINISTRATOR
      )
    )
      return interaction.reply({
        content: "i'm not have permissions gas `Manage Messages`.",
        ephemeral: true,
      })
    await interaction.channel?.messages
      .fetch({
        limit: interaction.options.getNumber('limit') as number,
      })
      .then(messages => {
        interaction.guild?.channels.fetch(interaction.channelId).then(a => {
          // @ts-ignore
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
            ephemeral: true,
          })
        })
      })
      .catch(error => console.log(error))
  }
}
