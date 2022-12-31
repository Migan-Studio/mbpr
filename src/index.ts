import { GatewayIntentBits, Partials } from 'discord.js'
import { Mbpr } from 'mbpr-rodule'
import path from 'path'
import { config } from 'dotenv'

config()
new Mbpr(
  {
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Channel],
  },
  {
    defaultHelpCommand: true,
    directory: {
      command: path.join(__dirname, 'Commands'),
    },
    token: process.env.TOKEN!,
  }
).start()
