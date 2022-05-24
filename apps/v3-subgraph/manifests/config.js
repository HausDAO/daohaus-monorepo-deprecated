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
        address: '0x31C948A5Ad149853B211de025082b61573ef3979',
        startBlock: 6918540,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 6918540,
      },
      {
        name: 'tributeEscrow',
        template: 'tribute-escrow-ds.yaml',
        address: '0x34f1F0585A4a8ca62e9573940f77aD25FbdED860',
        startBlock: 6935358,
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
