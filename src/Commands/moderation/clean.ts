import { Command } from '../../../modules/CommandHandler/src'
import {
  ApplicationCommandOptionType,
  CacheType,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Locale,
  PermissionsBitField,
} from 'discord.js'
import { englishUS, ifDM, ifNonePermissions, korean } from '../../localization'

export default class CleanCommands extends Command {
  public constructor() {
    super()
    this.name = englishUS.clean.name
    this.nameLocalizations = { ko: korean.clean.name }
    this.description = englishUS.clean.description
    this.descriptionLocalizations = { ko: korean.clean.description }
    this.options = [
      {
        type: ApplicationCommandOptionType.Number,
        name: englishUS.clean.options[0].name,
        nameLocalizations: { ko: korean.clean.options[0].name },
        description: englishUS.clean.options[0].description,
        descriptionLocalizations: { ko: korean.clean.options[0].description },
        minValue: 1,
        maxValue: 100,
        required: true,
      },
    ]
  }
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const limit = interaction.options.getNumber('clean-limit')!
    const embed = new EmbedBuilder().setTimestamp()
    if (interaction.locale === Locale.Korean) {
      if (interaction.channel!.type === ChannelType.DM)
        return interaction.reply({
          content: ifDM(Locale.Korean),
          ephemeral: true,
        })

      if (
        !interaction
          .guild!.members!.cache.get(interaction.user.id)!
          .permissions.has(PermissionsBitField.Flags.ManageMessages)
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.Korean, '메세지 관리하기', false),
          ephemeral: true,
        })

      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.ManageMessages
        )
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.Korean, '메세지 관리하기', true),
          ephemeral: true,
        })
      await interaction.channel?.messages
        .fetch({
          limit,
        })
        .then(messages => {
          interaction.guild?.channels.fetch(interaction.channelId).then(a => {
            // @ts-ignore
            a.bulkDelete(messages, true)
            interaction.reply({
              embeds: [
                embed
                  .setTitle(korean.clean.embeds.title)
                  .setDescription(korean.clean.embeds.description(limit)),
              ],
              ephemeral: true,
            })
          })
        })
        .catch(error => console.log(error))
    } else {
      if (interaction.channel!.type === ChannelType.DM)
        return interaction.reply({
          content: ifDM(Locale.EnglishUS),
          ephemeral: true,
        })

      if (
        !interaction
          .guild!.members!.cache.get(interaction.user.id)!
          .permissions.has(PermissionsBitField.Flags.ManageMessages)
      )
        return interaction.reply({
          content: ifNonePermissions(
            Locale.EnglishUS,
            'Manage Messages',
            false
          ),
          ephemeral: true,
        })

      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.ManageMessages
        )
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.EnglishUS, 'Manage Messages', true),
          ephemeral: true,
        })
      await interaction.channel?.messages
        .fetch({
          limit,
        })
        .then(messages => {
          interaction.guild?.channels.fetch(interaction.channelId).then(a => {
            // @ts-ignore
            a.bulkDelete(messages, true)
            interaction.reply({
              embeds: [
                embed
                  .setTitle(englishUS.clean.embeds.title)
                  .setDescription(englishUS.clean.embeds.description(limit)),
              ],
              ephemeral: true,
            })
          })
        })
        .catch(error => console.log(error))
    }
  }
}
