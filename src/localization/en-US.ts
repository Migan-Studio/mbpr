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
    embeds: {
      title: 'kick',
      description(kickedMemberName: string): string {
        return `Member ${kickedMemberName} has been kicked.`
      },
    },
  },
  ban: {
    name: 'ban',
    description: "mbpr project's ban",
    options: [
      {
        name: 'member',
        description: 'Member to ban',
      },
      {
        name: 'reason',
        description: 'a reason to ban',
      },
    ],
    embeds: {
      title: 'ban',
      description(kickedMemberName: string): string {
        return `Member ${kickedMemberName} has been banned.`
      },
    },
  },
  clean: {
    name: 'clean',
    description: "mpbr project's clean",
    options: [
      {
        name: 'clean-limit',
        description: "clean chat's limit",
      },
    ],
    embeds: {
      title: 'clean',
      description(count: number): string {
        return `${count} chat(s) have been deleted.`
      },
    },
  },
}
