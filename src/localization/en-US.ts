export default {
  help: {
    name: 'help',
    description: "mbpr project's help",
    embeds: {
      title(botName: string): string {
        return `${botName}'s help`
      },
      description: `# Information 
- help
- ping 

# moderation
- kick
- ban
- client
- unban`,
    },
  },
  ping: {
    name: 'ping',
    description: "mbpr project's ping",
    embeds: {
      title(botName: string): string {
        return `${botName}'s ping`
      },
      description(ping: number): string {
        return `${ping}ms`
      },
    },
  },
  kick: {
    name: 'kick',
    description: "mbpr project's kick",
    ifDMReply: "❌ Can't Using the DM. :(",
    options: [
      {
        name: 'member',
        description: 'Member to kick',
      },
      {
        name: 'reason',
        description: 'a reason to kick',
      },
    ],
  },
}