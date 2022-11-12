import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Locale,
  PermissionResolvable,
} from 'discord.js'

export class Command {
  name: string = ''
  // @ts-ignore
  nameLocalizations?: { [Locale]: string }
  description: string = ''
  // @ts-ignore
  descriptionLocalizations?: { [Locale]: string }
  type?: ApplicationCommandType = ApplicationCommandType.ChatInput
  options?: ApplicationCommandOptionData[]
  defaultPermission?: PermissionResolvable
  execute(interaction: ChatInputCommandInteraction): void {}
}
