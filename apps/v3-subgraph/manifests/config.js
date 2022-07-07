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
        address: '0x93ac67998B80692366c537D3537ea6640fc65c97',
        startBlock: 7174863,
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
        address: '0x328F80e44592E017B1745B0B574dBaB0c8DFc5f0',
        startBlock: 6953708,
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
