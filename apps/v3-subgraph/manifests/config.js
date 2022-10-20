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
  xdai: {
    dataSources: [],
    templates: [],
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
        address: '0x0C5fd8AAdF995e11E5Ac1CD72139Ee4fd72cDeFC',
        startBlock: 7260411,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 6918540,
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
