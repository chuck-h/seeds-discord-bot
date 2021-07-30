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


module.exports = { getReceivedGratitude, getRemainingGratitude, getBalance, getGratitudeStats, getCurrentSEEDSPrice, getAcks }