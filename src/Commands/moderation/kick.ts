import { Command } from '../../../modules/CommandHandler/src'
import {
  ChatInputCommandInteraction,
  CacheType,
  Locale,
  ChannelType,
  PermissionsBitField,
  ApplicationCommandOptionType,
  GuildMember,
  EmbedBuilder,
} from 'discord.js'
import { englishUS, ifDM, ifNonePermissions, korean } from '../../localization'

export default class KickCommands extends Command {
  public constructor() {
    super()
    this.name = englishUS.kick.name
    this.nameLocalizations = { ko: korean.kick.name }
    this.description = englishUS.kick.description
    this.descriptionLocalizations = { ko: korean.kick.description }
    this.options = [
      {
        type: ApplicationCommandOptionType.User,
        name: englishUS.kick.options[0].name,
        nameLocalizations: { ko: korean.kick.options[0].name },
        description: englishUS.kick.options[0].description,
        descriptionLocalizations: { ko: korean.kick.options[0].description },
        required: true,
      },
      {
        type: ApplicationCommandOptionType.String,
        name: englishUS.kick.options[1].name,
        nameLocalizations: { ko: korean.kick.options[1].name },
        description: englishUS.kick.options[1].description,
        descriptionLocalizations: { ko: korean.kick.options[1].description },
      },
    ]
  }
  execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const member = interaction.options.getMember('member') as GuildMember
    const reason = interaction.options.getString('reason')
    const embed = new EmbedBuilder().setTimestamp()
    if (interaction.locale === Locale.Korean) {
      if (interaction.channel?.type === ChannelType.DM)
        interaction.reply({
          content: ifDM(Locale.Korean),
          ephemeral: true,
        })

      if (
        !interaction
          .guild!.members!.cache!.get(interaction.user.id)!
          .permissions.has(PermissionsBitField.Flags.KickMembers)
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.Korean, '멤버 추방하기', false),
          ephemeral: true,
        })
      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.KickMembers
        )
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.Korean, '멤버 추방하기', true),
          ephemeral: true,
        })

      try {
        member.kick(reason || 'None')
        interaction.reply({
          embeds: [
            embed
              .setTitle(korean.kick.embeds.title)
              .setDescription(korean.kick.embeds.description(member.user.tag)),
          ],
          ephemeral: true,
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      if (interaction.channel?.type === ChannelType.DM)
        interaction.reply({
          content: ifDM(Locale.EnglishUS),
          ephemeral: true,
        })

      if (
        !interaction
          .guild!.members!.cache!.get(interaction.user.id)!
          .permissions.has(PermissionsBitField.Flags.KickMembers)
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.EnglishUS, 'Kick Members', false),
          ephemeral: true,
        })
      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.KickMembers
        )
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.EnglishUS, 'Kick Members', true),
          ephemeral: true,
        })

      try {
        member.kick(reason || 'None')
        interaction.reply({
          embeds: [
            embed
              .setTitle(englishUS.kick.embeds.title)
              .setDescription(
                englishUS.kick.embeds.description(member.user.tag)
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
