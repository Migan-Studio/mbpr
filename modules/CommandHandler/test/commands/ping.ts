import { Command } from '../../dist'
import { ChatInputCommandInteraction } from 'discord.js'

export default class extends Command {
  name = 'ping'
  nameLocalizations = { ko: '안녕' }
  descriptionLocalizations = { ko: '안녕' }
  description = 'pong'
  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.locale === 'ko') interaction.reply('안녕!')
    interaction.reply('Pong!')
  }
}
