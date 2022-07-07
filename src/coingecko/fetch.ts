const BASE_URL = 'https://api.coingecko.com/api/v3';
import { CoinHistory } from "../Model/coin";
import { HistoricalValue } from "../Model/graph";

export interface ErrorResponse {
    error: string;
}

export const getContractInfo = async (contractAddress: string, signal: AbortSignal) => {
    const url = `${BASE_URL}/coins/binance-smart-chain/contract/${contractAddress}`;
    const response = await fetch(url, { signal });
     return response.json() as Promise<any>;
}

export const getTokenInfo = async (keyword: string, signal: AbortSignal) => {
    const url = `${BASE_URL}/coins/${keyword}`;
    const response = await fetch(url, { signal });
    return response.json() as Promise<any>;
}

export const getMarketData = async (keyword: string, days: string,signal: AbortSignal) => {
    const url = `${BASE_URL}/coins/${keyword}/market_chart?vs_currency=usd&days=${days}`
    const response = await fetch(url, { signal });
    return response.json() as Promise<any>;

}

export const getContractMarketData = async (contractAddress: string , days: string, signal: AbortSignal) => {
    const url = `${BASE_URL}/coins/binance-smart-chain/contract/${contractAddress}/market_chart/?vs_currency=usd&days=${days}`;
    const response = await fetch(url, { signal });
     return response.json() as Promise<any>;

}