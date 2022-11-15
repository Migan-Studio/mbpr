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
  ban: {
    name: '차단',
    description: 'mbpr 프로젝트의 차단',
    options: [
      {
        name: '멤버',
        description: '차단할 멤버',
      },
      {
        name: '사유',
        description: '차단할 사유',
      },
    ],
    embeds: {
      title: '차단',
      description(kickedMemberName: string): string {
        return `멤버 ${kickedMemberName}을/를 차단했어요.`
      },
    },
  },
  clean: {
    name: '채팅청소',
    description: 'mbpr 프로젝트의 채팅청소',
    options: [
      {
        name: '청소-제한',
        description: '청소할 채팅의 갯수',
      },
    ],
    embeds: {
      title: '채팅청소',
      description(count: number): string {
        return `${count}개의 채팅을 청소했어요.`
      },
    },
  },
  unban: {
    name: '차단해제',
    description: 'mbpr 프로젝트의 차단 해제',
    options: [
      {
        name: '멤버id',
        description: '차단 해제할 멤버의 ID',
      },
    ],
    IDIsNaN: '값 `멤버id`는 멤버의 ID입니다.',
    embeds: {
      title: '차단 해제',
      description: '해당 멤버를 차단해제 했어요.',
    },
  },
}
