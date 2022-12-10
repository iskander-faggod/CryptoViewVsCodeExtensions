// imports
import axios from 'axios';
import { TokenData } from '../interfaces/TokenData';

export default class CryptoParsingService{
    private _tokens: TokenData[];
    private _apiToken : string;
    
    constructor(apiToken: string) {
        if (!apiToken){
            throw new Error("Api token must be not null");
        }
        this._tokens = [];
        this._apiToken = apiToken;
    }

    public async getTokensData(){
        await this._mapTokenModels();
        return this._tokens;
    }

    private async _mapTokenModels(){
        const notMappedTokens = await this._getCryptoResponse();
        if (!notMappedTokens){
            throw new Error("Problems with get crypto response");
        }

        const mappedTokens : TokenData[] = notMappedTokens.data.data.map((token: any) => {            
            const mappedToken : TokenData={
                name: token.name,
                symbol: token.symbol,
                inMomentPrice: token.quote.USD.price
            }

            this._tokens.push(mappedToken);
        });
    }

    private async _getCryptoResponse(){
        let response = null;
		try {
			response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
			headers: {
				'X-CMC_PRO_API_KEY': this._apiToken,
			},
			});
		} catch(e){
			console.log(e);
		}
        return response;
    }
}