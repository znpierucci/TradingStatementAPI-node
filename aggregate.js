const trades = require('./models/trades.js');
const TradeEvent = trades.TradeEvent
const TradingStatementByAsset = trades.TradingStatementByAsset
const TotalTradingStatement = trades.TotalTradingStatement


function createTradingStatement(allEvents) {
    if (allEvents == null) { return }

    const assetList = getAssets(allEvents);
    
    const sortedByAsset = sortByAsset(allEvents, 'asset');

    const fullySorted = sortByAssetAndEvent(sortedByAsset, assetList);

    const totals = calculateTotalStatementValues(fullySorted);

    return new TotalTradingStatement(fullySorted, totals.totalBuy, totals.totalSell, totals.totalPnL);
}

const calculateTotalStatementValues = (fullySorted) => {
    let totalBuy = 0;
    let totalSell = 0;

    fullySorted.forEach((current) => {
        totalBuy += current.totalAssetPurchaseAmount;
        totalSell += current.totalAssetSaleAmount;
    })

    return {
        totalBuy: totalBuy,
        totalSell: totalSell,
        totalPnL: totalSell - totalBuy
    }
}

const sortByAssetAndEvent = (sortedByAsset, assetList) => {
    let resultByAsset = [];

    assetList.forEach((currentAsset) => {
        resultByAsset.push(sortByEvent(sortedByAsset[currentAsset], currentAsset))
    })
    
    return resultByAsset
}

const sortByEvent = (allEvents, asset) => {
    let buys = [];
    let sales = [];
    allEvents.forEach((current) => {
        if (current.eventType === "buy") {
            buys.push(current);
        } else if (current.eventType === "sell") {
            sales.push(current);
        }
    })
    
    const totalAssetPurchaseAmount = totalCost(buys);
    const totalAssetSaleAmount = totalCost(sales);
    const totalAssetPnL = totalAssetSaleAmount - totalAssetPurchaseAmount;

    return new TradingStatementByAsset(asset, totalAssetPurchaseAmount, totalAssetSaleAmount, totalAssetPnL)
}

function sortByAsset(allEvents, property) {
    return allEvents.reduce(function(memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

const getAssets = (allEvents) => {
    let assetList = [];
    allEvents.forEach((current) => {
        if (!assetList.includes(current.asset)) {
            assetList.push(current.asset)
        }
    })

    return assetList;
}

const totalCost = (events) => {
    let total = 0;
    events.forEach((current) => {
        let currentPrice = current.amount * current.pricePerAsset;
        total += currentPrice;
    });
    return total;
}

let eventList = [];
const event1 = new TradeEvent("buy", "solana", 100, 30, Date.now());
const event2 = new TradeEvent("buy", "solana", 100, 40, Date.now());
const event3 = new TradeEvent("sell", "solana", 100, 50, Date.now());
const event4 = new TradeEvent("sell", "solana", 100, 60, Date.now());
const event5 = new TradeEvent("buy", "ethereum", 10, 1000, Date.now());
const event6 = new TradeEvent("sell", "ethereum", 10, 2000, Date.now());
const event7 = new TradeEvent("buy", "bitcoin", 1, 10000, Date.now());
const event8 = new TradeEvent("sell", "bitcoin", 1, 20000, Date.now());
eventList.push(event1);
eventList.push(event2);
eventList.push(event3);
eventList.push(event4);
eventList.push(event5);
eventList.push(event6);
eventList.push(event7);
eventList.push(event8);

// createTradingStatement(eventList)

module.exports = {
    createTradingStatement
}