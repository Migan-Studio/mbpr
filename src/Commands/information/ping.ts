import { Command } from '../../../modules/CommandHandler'
import {
  CacheType,
  ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
  Locale,
} from 'discord.js'
import { korean } from '../../localization'

export default class PingCommands extends Command {
  public constructor() {
    super()
    this.name = 'ping'
    this.nameLocalizations = { ko: korean.ping.name }
    this.description = "mbpr project's ping"
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
            .setTitle(`${interaction.client.user!.username}'s ping`)
            .setDescription(codeBlock('md', `${interaction.client.ws.ping}ms`))
            .setTimestamp(),
        ],
      })
  }
}
