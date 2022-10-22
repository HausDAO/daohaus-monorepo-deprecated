module.exports.config = {
  mainnet: {
    dataSources: [
      {
        name: 'baalSummoner-v1.0.0',
        template: 'baal-summoner-ds.yaml',
        address: '0xf020a55794DB5e065692F86a0Eb82197850a09b9',
        startBlock: 15796496,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 15796496,
      },
      {
        name: 'tributeMinion-v1.0.0',
        template: 'tribute-minion-ds.yaml',
        address: '0x5c17BFBaB751C5ddF1Ff267acF8fF919537F39Cf',
        startBlock: 15796555,
      },
    ],
    templates: [
      {
        name: 'baalTemplate',
        template: 'baal-template.yaml',
      },
      {
        name: 'sharesTemplate',
        template: 'shares-template.yaml',
      },
      {
        name: 'lootTemplate',
        template: 'loot-template.yaml',
      },
    ],
  },
  'arbitrum-one': {
    dataSources: [],
    templates: [],
  },
  optimism: {
    dataSources: [],
    templates: [],
  },
  xdai: {
    dataSources: [
      {
        name: 'baalSummoner',
        template: 'baal-summoner-ds.yaml',
        address: '0x3Bd3fDf6db732F8548638Cd35B98d624c77FB351',
        startBlock: 23990433,
      },
      {
        name: 'baalSummoner-v1.0.0',
        template: 'baal-summoner-ds.yaml',
        address: '0xf020a55794DB5e065692F86a0Eb82197850a09b9',
        startBlock: 24659969,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 23990433,
      },
      {
        name: 'tributeMinion',
        template: 'tribute-minion-ds.yaml',
        address: '0x9391b6A7c55832a6802484dE054d81496D56545A',
        startBlock: 23993265,
      },
      {
        name: 'tributeMinion-v1.0.0',
        template: 'tribute-minion-ds.yaml',
        address: '0x5c17BFBaB751C5ddF1Ff267acF8fF919537F39Cf',
        startBlock: 24660234,
      },
    ],
    templates: [
      {
        name: 'baalTemplate',
        template: 'baal-template.yaml',
      },
      {
        name: 'sharesTemplate',
        template: 'shares-template.yaml',
      },
      {
        name: 'lootTemplate',
        template: 'loot-template.yaml',
      },
    ],
  },
  matic: {
    dataSources: [],
    templates: [],
  },
  goerli: {
    dataSources: [
      {
        name: 'baalSummoner',
        template: 'baal-summoner-ds.yaml',
        address: '0xEd6AA9879Ed6ba07411C3224F748Dc65D3f8e685',
        startBlock: 7510135,
      },
      {
        name: 'baalSummoner-v1.0.0',
        template: 'baal-summoner-ds.yaml',
        address: '0xf020a55794DB5e065692F86a0Eb82197850a09b9',
        startBlock: 7798375,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 7510135,
      },
      {
        name: 'tribute-minion-mapping.yaml',
        template: 'tribute-minion-ds.yaml',
        address: '0x9C6f6e6E461FB1dB9761c960900A0Ae05B9786A7',
        startBlock: 7290177,
      },
      {
        name: 'tributeMinion-v1.0.0',
        template: 'tribute-minion-ds.yaml',
        address: '0x5c17BFBaB751C5ddF1Ff267acF8fF919537F39Cf',
        startBlock: 7798495,
      },
    ],
    templates: [
      {
        name: 'baalTemplate',
        template: 'baal-template.yaml',
      },
      {
        name: 'sharesTemplate',
        template: 'shares-template.yaml',
      },
      {
        name: 'lootTemplate',
        template: 'loot-template.yaml',
      },
    ],
  },
};
