import { BaseExtractor } from './base-extractor';
import { MaterialDataProvider } from './data-providers/material-dp';
import { State, Material, LocalMarket } from '../state';
import '../helpers';
import { LocalMarketDataProvider } from './data-providers/localmarket-dp';

class LocalMarketExtractor implements BaseExtractor {
    // private materials: { [materialId: string]: Material };
    private localmarkets: { [lmId: string]: LocalMarket };

    Parse(state: State): any {

        this.localmarkets = new LocalMarketDataProvider(state).LocalMarkets;
        // this.materials = new MaterialDataProvider(state).Materials;

        var lms = this.localmarkets;

        var lmss = this.parseLM(state);

        /*
        var ads = state.data.items.localmarkets.map( (lm) => {
            return {
                id: lm.id,
                currency: lm.currency.code,
            };
        });
        */
        /*
        var ads = state.data.items.localmarkets.localmarkets.map( localmarket => {
            var ad = localmarket.ads.map( ad => {
                return {
                    id: ad.id,
                    type: ad.type,
                    price: ad.price,
                    quantity: ad.quantity,
                    status: ad.status,
                }
            });
            return ad;
        });
        */
        /*
        var ads = state.data.items.localmarkets.localmarkets.map( localmarket => {
            return {
                id: localmarket.id,
            }
        });
        */

        return {
            dataVersion: 'LM-001',
            userInfo: {
                username: state.user.user.data.username,
                companyId: state.user.user.data.companyId,
                userId: state.user.user.data.id,
            },
            tag: "Tarrke",
            localmarkets: lmss,
            //ads: ads,
        };
    }

    private parseLM(state: State) {
        var lm = Object.keys(state.data.items.localmarkets)
            .map(key => state.data.items.localmarkets[key])
            .map( localmarket => {
                return {
                    id: localmarket.id,
                    currency: localmarket.currency,
                    availableAdTypes: localmarket.availableAdTypes,
                    ads: Object.keys(localmarket.ads)
                        .map(key => localmarket.ads[key])
                        .map(ad => {
                            if (ad.type == "COMMODITY_BUYING" || ad.type == "COMMODITY_SELLING" ) {
                                return {
                                    items: ad.quantity.amount + " " + ad.quantity.material.ticker,
                                    price: ad.price.amount + " " + ad.price.currency,
                                    // minimumRating: ad.minimumRating,
                                    status: ad.status,
                                    // type: ad.type,
                                }                                
                            } else {
                                return {
                                    price: ad.price.amount + " " + ad.price.currency,
                                    minimumRating: ad.minimumRating,
                                    status: ad.status,
                                    type: ad.type,
                                }
                            }
                        }),
                };
            })
            .toDictionary(localmarket => localmarket.id)
        return lm;
    }
}

export { LocalMarketExtractor }

