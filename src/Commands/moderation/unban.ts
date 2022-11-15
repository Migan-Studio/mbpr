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

export default class UnbanCommands extends Command {
  public constructor() {
    super()
    this.name = englishUS.unban.name
    this.nameLocalizations = { ko: korean.unban.name }
    this.description = englishUS.unban.description
    this.descriptionLocalizations = { ko: korean.unban.description }
    this.options = [
      {
        type: ApplicationCommandOptionType.String,
        name: englishUS.unban.options[0].name,
        nameLocalizations: { ko: korean.unban.options[0].name },
        description: englishUS.unban.options[0].description,
        descriptionLocalizations: { ko: korean.unban.options[0].description },
        required: true,
      },
    ]
  }
  execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const embed = new EmbedBuilder().setTimestamp()
    const memberID = interaction.options.getString('memberid')!
    if (interaction.locale === Locale.Korean) {
      if (interaction.channel!.type === ChannelType.DM)
        return interaction.reply({
          content: ifDM(Locale.Korean),
          ephemeral: true,
        })

      if (
        !interaction
          .guild!.members!.cache!.get(interaction.user.id)!
          .permissions.has(PermissionsBitField.Flags.BanMembers)
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.Korean, '멤버 차단하기', false),
          ephemeral: true,
        })

      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.BanMembers
        )
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.Korean, '멤버 차단하기', true),
          ephemeral: true,
        })

      if (isNaN(memberID as unknown as number))
        return interaction.reply({
          content: korean.unban.IDIsNaN,
          ephemeral: true,
        })

      interaction!
        .guild!.members.unban(memberID)
        .then(() => {
          interaction.reply({
            embeds: [
              embed
                .setTitle(korean.unban.embeds.title)
                .setDescription(korean.unban.embeds.description),
            ],
            ephemeral: true,
          })
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      if (interaction.channel!.type === ChannelType.DM)
        return interaction.reply({
          content: ifDM(Locale.EnglishUS),
          ephemeral: true,
        })

      if (
        !interaction
          .guild!.members!.cache!.get(interaction.user.id)!
          .permissions.has(PermissionsBitField.Flags.BanMembers)
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.EnglishUS, 'Ban Members', false),
          ephemeral: true,
        })

      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.BanMembers
        )
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.EnglishUS, 'Ban Members', true),
          ephemeral: true,
        })

      if (isNaN(memberID as unknown as number))
        return interaction.reply({
          content: englishUS.unban.IDIsNaN,
          ephemeral: true,
        })

      interaction!
        .guild!.members.unban(memberID)
        .then(() => {
          interaction.reply({
            embeds: [
              embed
                .setTitle(englishUS.unban.embeds.title)
                .setDescription(englishUS.unban.embeds.description),
            ],
            ephemeral: true,
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
