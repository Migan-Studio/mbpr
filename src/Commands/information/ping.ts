import { Command } from '../../../modules/CommandHandler/src'
import {
  CacheType,
  ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
  Locale,
} from 'discord.js'
import { englishUS, korean } from '../../localization'

export default class PingCommands extends Command {
  public constructor() {
    super()
    this.name = englishUS.ping.name
    this.nameLocalizations = { ko: korean.ping.name }
    this.description = englishUS.ping.description
    this.descriptionLocalizations = { ko: korean.ping.description }
  }
  execute(interaction: ChatInputCommandInteraction<CacheType>): void {
    if (interaction.locale === Locale.Korean)
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              korean.ping.embeds.title(interaction.client.user!.username)
            )
            .setDescription(
              codeBlock(
                'md',
                korean.ping.embeds.description(interaction.client.ws.ping)
              )
            )
            .setTimestamp(),
        ],
      })
    else
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              englishUS.ping.embeds.title(interaction.client.user!.username)
            )
            .setDescription(
              codeBlock(
                'md',
                englishUS.ping.embeds.description(interaction.client.ws.ping)
              )
            )
            .setTimestamp(),
        ],
      })
  }
}
