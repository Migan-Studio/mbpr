import { Command } from 'mbpr-rodule'
import {
  CacheType,
  ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
  Locale,
} from 'discord.js'
import { englishUS, korean } from '../../localization/index.js'

export default class PingCommands extends Command {
  public constructor() {
    super({
      name: englishUS.ping.name,
      nameLocalizations: { ko: korean.ping.name },
      description: englishUS.ping.description,
      descriptionLocalizations: { ko: korean.ping.description },
    })
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
