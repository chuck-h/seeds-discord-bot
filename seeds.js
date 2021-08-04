const { JsonRpc, Api, Serialize } = require('eosjs')

const fetch = require('node-fetch')

const rpc = new JsonRpc('https://node.hypha.earth', {
    fetch
})

// getDefferedSeeds

const getGratitudeStats = async () => {
  const statsTable = await rpc.get_table_rows({
    code: 'gratz.seeds',
    scope: 'gratz.seeds',
    table: 'stats2',
    json: true
  })
  if (statsTable.rows) {
    return statsTable.rows[statsTable.rows.length-1];
  }
  return [];
}

const getRemainingGratitude = async account => {
  const balanceTable = await rpc.get_table_rows({
    code: 'gratz.seeds',
    scope: 'gratz.seeds',
    table: 'balances',
    json: true
  })
  const balance = balanceTable.rows.filter(r => r.account == account)
  var res = 0;
  if (balance.length > 0) {
    res = parseInt(balance[0].remaining); 
  }
  return res;
}

const getReceivedGratitude = async account => {
  const balanceTable = await rpc.get_table_rows({
    code: 'gratz.seeds',
    scope: 'gratz.seeds',
    table: 'balances',
    json: true
  })
  const balance = balanceTable.rows.filter(r => r.account == account)
  var res = 0;
  if (balance.length > 0) {
    res = parseInt(balance[0].received); 
  }
  return res
}

const getCurrentSEEDSPrice = async () => {
  const priceTable = await rpc.get_table_rows({
    code: 'tlosto.seeds',
    scope: 'tlosto.seeds',
    table: 'price',
    json: true
  })
  if (priceTable.rows) {
    return priceTable.rows[priceTable.rows.length-1];
  }
  return [];
}


const getBalance = async (account) => {
  const balance = await rpc.get_currency_balance('token.seeds', account, 'SEEDS')
  return Number.parseInt(balance[0])
}

const getAcks = async (account) => {
  const acksTable = await rpc.get_table_rows({
    code: 'gratz.seeds',
    scope: 'gratz.seeds',
    table: 'acks',
    lower_bound: account,
    json: true
  })
  if (acksTable.rows) {
    var acks =  acksTable.rows.reduce(function(map, obj) {
      map[obj.donor] = obj.receivers;
      return map;
    }, {})
    return acks[account]
  }
  return ['none'];
}

const getAccount = async (account) => {
  const accountsTable = await rpc.get_table_rows({
    code: 'accts.seeds',
    scope: 'accts.seeds',
    table: 'users',
    lower_bound: account,
    upper_bound: account,
    json: true
  })
  if (accountsTable.rows) {
    return accountsTable.rows[accountsTable.rows.length-1];
  }
  return null;
}

const getCurrentProposals = async () => {
  const cycleTable = await rpc.get_table_rows({
    code: 'funds.seeds',
    scope: 'funds.seeds',
    table: 'cyclestats',
    limit: 100,
    json: true
  })
  if (cycleTable.rows) {
    var last_cycle = cycleTable.rows[cycleTable.rows.length-1]

    const propsTable = await rpc.get_table_rows({
      code: 'funds.seeds',
      scope: 'funds.seeds',
      table: 'props',
      lower_bound: last_cycle.active_props[0],
      upper_bound: last_cycle.active_props[last_cycle.active_props.length-1],
      json: true
    })
    if (propsTable.rows) {
      return propsTable.rows;
    } else return [];
  } else return [];
}

const getCurrentSupport = async () => {
  const allianceSupportTable = await rpc.get_table_rows({
    code: 'funds.seeds',
    scope: "alliance",
    table: 'support',
    json: true
  })
  const campaignSupportTable = await rpc.get_table_rows({
    code: 'funds.seeds',
    scope: "campaign",
    table: 'support',
    json: true
  })
  if (allianceSupportTable.rows && campaignSupportTable.rows) {
    const cycle = allianceSupportTable.rows[allianceSupportTable.rows.length-1].propcycle
    const alliance_needed = allianceSupportTable.rows[allianceSupportTable.rows.length-1].voice_needed
    const campaign_needed = campaignSupportTable.rows[campaignSupportTable.rows.length-1].voice_needed
    return {"cycle":cycle, "alliances":alliance_needed, "campaigns":campaign_needed};
  }
  return [];
}



module.exports = { getReceivedGratitude, getRemainingGratitude, getBalance, getGratitudeStats, getCurrentSEEDSPrice, getAcks, getAccount, getCurrentProposals, getCurrentSupport }