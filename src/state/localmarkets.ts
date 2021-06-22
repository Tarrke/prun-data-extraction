// import { BuildingInputOutput } from './production';

interface LocalMarkets {
    localmarkets: Array<LocalMarket>,
    // categories: Array<MaterialCategory>,
}

interface LocalMarket {
    id: string,
    ads: Array<LocalMarketAd>,
    currency : {
        code: string,
        name: string,
        numericCode: number,
    },
}

interface LocalMarketAd {
    id: string,
    type: string,
    status: string,
    minimumRating: string,
    price: {
        amount: number,
        currency: string,
    },
}

export {
    LocalMarket,
    LocalMarkets,
    LocalMarketAd,
}
