module.exports.config = {
  mainnet: {
    dataSources: [],
    templates: [],
  },
  'arbitrum-one': {
    dataSources: [],
    templates: [],
  },
  optimism: {
    dataSources: [],
    templates: [],
  },
  gnosis: {
    dataSources: [
      {
        name: 'baalSummoner',
        template: 'baal-summoner-ds.yaml',
        address: '0x3Bd3fDf6db732F8548638Cd35B98d624c77FB351',
        startBlock: 23990433,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 11821598,
      },
      {
        name: 'tribute-minion-mapping.yaml',
        template: 'tribute-minion-ds.yaml',
        address: '0x9391b6A7c55832a6802484dE054d81496D56545A',
        startBlock: 23993265,
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
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 6102403,
      },
      {
        name: 'tribute-minion-mapping.yaml',
        template: 'tribute-minion-ds.yaml',
        address: '0x9C6f6e6E461FB1dB9761c960900A0Ae05B9786A7',
        startBlock: 7290177,
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
