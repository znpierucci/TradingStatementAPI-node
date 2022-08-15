class TradeEvent {
    constructor(eventType, asset, amount, pricePerAsset, date) {
        this.eventType = eventType;
        this.asset = asset;
        this.amount = amount;
        this.pricePerAsset = pricePerAsset;
        this.date = date;
    }
}

class TradingStatementByAsset {
    constructor(asset, totalAssetPurchaseAmount, totalAssetSaleAmount, totalAssetPnL) {
        this.asset = asset;
        this.totalAssetPurchaseAmount = totalAssetPurchaseAmount;
        this.totalAssetSaleAmount = totalAssetSaleAmount;
        this.totalAssetPnL = totalAssetPnL;
    }
}

class TotalTradingStatement {
    constructor(statementByAsset, totalAssetPurchaseAmount, totalAssetSaleAmount, totalAssetPnL) {
        this.statementByAsset = statementByAsset
        this.totalPurchaseAmount = totalAssetPurchaseAmount;
        this.totalSaleAmount = totalAssetSaleAmount;
        this.totalPnL = totalAssetPnL;
    }
}

module.exports.TradeEvent = TradeEvent
module.exports.TradingStatementByAsset = TradingStatementByAsset
module.exports.TotalTradingStatement = TotalTradingStatement