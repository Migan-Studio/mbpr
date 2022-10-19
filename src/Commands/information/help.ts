import { Command } from '../../../modules/CommandHandler/src'
import {
  CacheType,
  ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
  Locale,
} from 'discord.js'
import { englishUS, korean } from '../../localization'

export default class HelpCommands extends Command {
  constructor() {
    super()
    this.name = englishUS.help.name
    this.nameLocalizations = { ko: korean.help.name }
    this.description = englishUS.help.description
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
            .setTitle(
              englishUS.help.embeds.title(interaction.client.user!.username)
            )
            .setDescription(codeBlock('md', englishUS.help.embeds.description))
            .setTimestamp()
            .setThumbnail(interaction.client.user!.displayAvatarURL()),
        ],
      })
  }
}
