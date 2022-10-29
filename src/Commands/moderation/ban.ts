import { Command } from '../../../modules/CommandHandler/src'
import { englishUS, korean, ifDM, ifNonePermissions } from '../../localization'
import {
  ApplicationCommandOptionType,
  CacheType,
  ChatInputCommandInteraction,
  GuildMember,
  EmbedBuilder,
  Locale,
  ChannelType,
  PermissionsBitField,
} from 'discord.js'

export default class BanCommands extends Command {
  public constructor() {
    super()
    this.name = englishUS.ban.name
    this.nameLocalizations = { ko: korean.ban.name }
    this.description = englishUS.ban.description
    this.descriptionLocalizations = { ko: korean.ban.description }
    this.options = [
      {
        type: ApplicationCommandOptionType.User,
        name: englishUS.ban.options[0].name,
        nameLocalizations: { ko: korean.ban.options[0].name },
        description: englishUS.ban.options[0].description,
        descriptionLocalizations: { ko: korean.ban.options[0].description },
        required: true,
      },
      {
        type: ApplicationCommandOptionType.String,
        name: englishUS.ban.options[1].name,
        nameLocalizations: { ko: korean.ban.options[1].name },
        description: englishUS.ban.options[1].description,
        descriptionLocalizations: { ko: korean.ban.options[1].description },
        required: false,
      },
    ]
  }
  execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const member = interaction.options.getMember('member') as GuildMember
    const reason = interaction.options.getString('reason')
    const embed = new EmbedBuilder().setTimestamp()
    if (interaction.locale === Locale.Korean) {
      if (interaction.channel?.type === ChannelType.DM)
        return interaction.reply({
          content: ifDM(Locale.Korean),
          ephemeral: true,
        })

      if (
        !interaction.guild?.members.cache
          .get(interaction.user.id)
          ?.permissions.has(PermissionsBitField.Flags.BanMembers)
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

      try {
        member.ban({
          reason: reason || 'None',
        })
        interaction.reply({
          embeds: [
            embed
              .setTitle(korean.ban.embeds.title)
              .setDescription(korean.ban.embeds.description(member.user.tag)),
          ],
          ephemeral: true,
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      if (interaction.channel?.type === ChannelType.DM)
        return interaction.reply({
          content: ifDM(Locale.EnglishUS),
          ephemeral: true,
        })

      if (
        !interaction.guild?.members.cache
          .get(interaction.user.id)
          ?.permissions.has(PermissionsBitField.Flags.BanMembers)
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

      try {
        member.ban({ reason: reason || 'None' })
        interaction.reply({
          embeds: [
            embed
              .setTitle(englishUS.ban.embeds.title)
              .setDescription(
                englishUS.ban.embeds.description(member.user.tag)
              ),
          ],
          ephemeral: true,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
