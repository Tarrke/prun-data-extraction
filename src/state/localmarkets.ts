// import { BuildingInputOutput } from './production';

interface LocalMarkets {
    localmarkets: Array<LocalMarket>,
    // categories: Array<MaterialCategory>,
}

interface LocalMarket {
    id: string,
    ads: { [id: string]: LocalMarketAd },
    currency : {
        code: string,
        name: string,
        numericCode: number,
    },
    availableAdTypes: Array<string>,
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
    quantity: any,
}

export {
    LocalMarket,
    LocalMarkets,
    LocalMarketAd,
}
