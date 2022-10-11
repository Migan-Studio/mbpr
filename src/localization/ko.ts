export default {
  help: {
    name: '도움말',
    description: 'mbpr 프로젝트의 도움말',
    embeds: {
      title(botName: string): string {
        return `${botName}의 도움말`
      },
      description: `# 정보
- 도움말

# 관리
- 추방
- 차단
- 채팅청소
- 차단해제`,
    },
  },
  ping: {
    name: '핑',
    description: 'mbpr 프로젝트의 핑',
    embeds: {
      title(botName: string): string {
        return `${botName}의 핑`
      },
      description(ping: number): string {
        return `${ping}ms`
      },
    },
  },
}
