import { GatewayIntentBits, Partials } from 'discord.js'
import { Mbpr } from 'mbpr-rodule'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config.js'

new Mbpr(
  {
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Channel],
  },
  {
    defaultHelpCommand: true,
    directory: {
      command: join(dirname(fileURLToPath(import.meta.url)), 'Commands'),
    },
    token: process.env.TOKEN!,
  }
).start()
