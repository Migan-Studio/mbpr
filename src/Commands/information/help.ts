import { Command } from '../../../modules/CommandHandler'
import {
  CacheType,
  ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
  Locale,
} from 'discord.js'
import { korean } from '../../localization'

export default class HelpCommands extends Command {
  constructor() {
    super()
    this.name = 'help'
    this.nameLocalizations = { ko: korean.help.name }
    this.description = "mbpr project's help"
    this.descriptionLocalizations = { ko: korean.help.description }
  }
  execute(interaction: ChatInputCommandInteraction<CacheType>): void {
    if (interaction.locale === Locale.Korean)
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              korean.help.embeds.title(interaction.client.user!.username)
            )
            .setDescription(codeBlock('md', korean.help.embeds.description))
            .setTimestamp()
            .setThumbnail(interaction.client.user!.displayAvatarURL()),
        ],
      })
    else
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${interaction.client.user!.username}'s Help`)
            .setDescription(
              codeBlock(
                'md',
                `# Information
- help

# Moderator
- kick
- ban
- clean
- unban`
              )
            )
            .setTimestamp()
            .setThumbnail(interaction.client.user!.displayAvatarURL()),
        ],
      })
  }
}
