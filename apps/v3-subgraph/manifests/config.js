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
        address: '0x9AC9d5c6D2f9728cf5c9B6D80D1cdbD4Cf27F58B',
        startBlock: 7433979,
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
