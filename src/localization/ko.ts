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
  kick: {
    name: '추방',
    description: 'mbpr 프로젝트의 추방',
    options: [
      {
        name: '멤버',
        description: '추방할 멤버',
      },
      {
        name: '사유',
        description: '추방할 사유',
      },
    ],
    embeds: {
      title: '추방',
      description(kickedMemberName: string): string {
        return `멤버 ${kickedMemberName}을/를 추방했어요.`
      },
    },
  },
}
