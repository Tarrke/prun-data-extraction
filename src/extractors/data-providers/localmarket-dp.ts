import { State, Material, LocalMarket } from '../../state';


class LocalMarketDataProvider {
    public Materials: { [materialId: string]: Material };
    public LocalMarkets: { [localmarketId: string]: LocalMarket };

    constructor(private data: State) {
        this.LocalMarkets = Object.keys(data.data.items.localmarkets)
            .map(key => data.data.items.localmarkets[key])
            .map(localmarket => ({ 
                id: localmarket.id,
                currency: localmarket.currency,
                ads: localmarket.ads,
                availableAdTypes: localmarket.availableAdTypes,
            }))
            .reduce((obj, localmarket) => Object.assign(obj, { [localmarket.id]: localmarket }), {});
        
        this.Materials = data.materials.materials
            .reduce((obj, material) => Object.assign(obj, { [material.id]: material }), {});
        
    }
}

export { LocalMarketDataProvider, Material, LocalMarket }

